'use strict';

const security = require('../lib/security');
const FilesService = require('../services/files');

class FilesController {
  constructor(router) {
    this.router = router;
    this.registerRoutes();
  }

  registerRoutes() {
    this.router.post('/v1/files', security.checkUserScope.bind(this, security.scope.WRITE_FILES), this.uploadFile.bind(this));
    this.router.delete('/v1/files/:file', security.checkUserScope.bind(this, security.scope.WRITE_FILES), this.deleteFile.bind(this));
  }

  uploadFile(req, res, next) {
    FilesService.uploadFile(req, res, next);
  }

  deleteFile(req, res, next) {
    FilesService.deleteFile(req.params.file).then(() => {
      res.end()
    }).catch(next)
  }
}

module.exports = FilesController;
