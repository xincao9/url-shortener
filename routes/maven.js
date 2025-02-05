const express = require('express')
const router = express.Router()
const { exec } = require('child_process')
const archiver = require('archiver')
const fs = require('fs')
const path = require('path')
const { v4: uuidv4 } = require('uuid')
const redis = require('../plugins/redis')
const os = require('os')

const dataDir = path.join(os.homedir(), 'project')

try {
  fs.mkdirSync(dataDir, { recursive: true })
} catch (err) {
  console.error(`mkdirSync: ${err.message}`)
}

router.post('/generate', async (req, res) => {
  let { groupId, artifactId, version } = req.body
  if (!groupId || !artifactId || !version) {
    res.status(400).json({ error: 'Missing required fields' })
    return
  }
  process.chdir(dataDir)
  const command = `/usr/local/maven/bin/mvn archetype:generate -DgroupId=${groupId} -DartifactId=${artifactId} -Dversion=${version} -DarchetypeArtifactId=sample-archetype -DarchetypeGroupId=com.github.xincao9.archetype -DinteractiveMode=false`
  const id = uuidv4()
  try {
    await redis.set(id, JSON.stringify({ groupId, artifactId, version }))
  } catch (err) {
    console.error({ error: err.message })
  }
  res.send({ id })
  exec(command, async (error, stdout, stderr) => {
    if (error) {
      console.error({ error: error.message })
    }
    if (stderr) {
      console.error({ error: stderr.message })
    }
    try {
      fs.renameSync(
        path.join(dataDir, artifactId),
        path.join(dataDir, `${artifactId}-${id}`)
      )
    } catch (err) {
      console.error({ error: err.message })
    }
    console.log(console)
  })
})

router.get('/download/:id', async (req, res) => {
  let { id } = req.params
  if (!id) {
    res.status(400).json({ error: 'Missing required fields' })
    return
  }
  let value = ''
  try {
    value = await redis.get(id)
  } catch (err) {
    return res.status(500).send({ error: err.message })
  }
  if (!value) {
    res.status(400).json({ error: 'Parameter error' })
  }
  const { artifactId } = JSON.parse(value)
  const outputPath = path.join(dataDir, `${artifactId}-${id}`)

  if (!fs.existsSync(outputPath)) {
    return res.send({
      message: 'Generating, please use this link to download later',
    })
  }

  const zipname = path.join(dataDir, `${artifactId}-${id}.zip`)
  const output = fs.createWriteStream(zipname)
  const archive = archiver('zip', {
    zlib: { level: 9 }, // 设置压缩级别
  })

  output.on('close', () => {
    res.download(zipname)
  })

  archive.on('error', (err) => {
    return res.status(500).send({ error: err.message })
  })

  archive.pipe(output)
  archive.directory(outputPath, false)
  archive.finalize()
})
module.exports = router
