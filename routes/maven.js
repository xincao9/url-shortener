const express = require('express')
const router = express.Router()
const { exec } = require('child_process')
const archiver = require('archiver')
const fs = require('fs')
const path = require('path')
const { v4: uuidv4 } = require('uuid')
const redis = require('../plugins/redis')

router.post('/generate', async (req, res) => {
  let { groupId, artifactId, version } = req.body
  if (!groupId || !artifactId || !version) {
    res.status(400).json({ error: 'Missing required fields' })
    return
  }
  const command = `mvn archetype:generate -DgroupId=${groupId} -DartifactId=${artifactId} -Dversion=${version} -DarchetypeArtifactId=sample-archetype -DarchetypeGroupId=com.github.xincao9.archetype -DinteractiveMode=false`
  exec(command, async (error, stdout, stderr) => {
    if (error) {
      return res.status(500).send({ error: error.message })
    }
    if (stderr) {
      return res.status(500).send({ error: stderr.message })
    }
    const id = uuidv4()
    try {
      await redis.set(id, req.body)
    } catch (e) {
      return res.status(500).send({ error: err.message })
    }
    res.send({ stdout, id: id })
  })
})

router.get('/download/:id', async (req, res) => {
  let { id } = req.params
  if (!id) {
    res.status(400).json({ error: 'Missing required fields' })
    return
  }
  try {
    const value = await redis.get(id)
    if (!value) {
      res.status(400).json({ error: 'Parameter error' })
    }
  } catch (err) {
    return res.status(500).send({ error: err.message })
  }
  const { artifactId, version } = value
  const zipname = `${artifactId}-${version}.zip`
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
  archive.directory(path.join(__dirname, artifactId), false)
  archive.finalize()
})
module.exports = router
