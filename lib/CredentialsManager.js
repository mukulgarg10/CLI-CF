const Configstore = require('configstore');
const pkg = require('../package.json');

class CredentialsManager {
    constructor() {
        this.conf = new Configstore(pkg.name);
    };

    setCredentials(handle, password) {
        this.conf.set('handle', handle);
        this.conf.set('password', password);
    };

    getHandle() {
        const handle = this.conf.get('handle');
        if (!handle) {
            throw new Error('No handle configured');
        }
        return handle;
    };

    // This will be run only after getHandle()
    getPassword() {
        return this.conf.get('password');
    };

    unsetCredentials() {
        if (!this.conf.get('handle')) {
            throw new Error('No handle configured');
        }
        this.conf.delete('handle');
        this.conf.delete('password');
    };

    setCompiler(compilerNumber) {
        this.conf.set('compiler', compilerNumber);
    };

    getCompiler() {
        if (!this.conf.get('compiler')) {
            throw new Error('No compiler configured');
        }
        return this.conf.get('compiler');
    };

}; 

module.exports = CredentialsManager;