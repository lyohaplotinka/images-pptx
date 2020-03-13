import { type } from 'os'
import { exec } from 'child_process'
import { promises } from 'fs'

const { lstat } = promises

enum OS {
  DARWIN = 'darwin',
  WIN = 'windows',
  LINUX = 'linux',
}

export default class NativeLaunchService {
  public readonly osType: OS

  private macRegexp = new RegExp('darwin', 'gi')
  private windowsRegexp = new RegExp('windows', 'gi')
  private linuxRegexp = new RegExp('linux', 'gi')

  private copyFileCommand = ''
  private copyFolderCommand = ''
  private rmFileCommand = ''
  private rmFolderCommand = ''
  private zipCommand = ''
  private mkdirCommand = ''

  constructor() {
    const nodeOsType = type()
    if (this.macRegexp.test(nodeOsType)) this.osType = OS.DARWIN
    else if (this.windowsRegexp.test(nodeOsType)) this.osType = OS.WIN
    else if (this.linuxRegexp.test(nodeOsType)) this.osType = OS.LINUX
    else {
      throw new Error(`Could not detect OS type: native mode unavailable for os "${nodeOsType}"`)
    }
    this.initCommands()
  }

  private initCommands(): void {
    switch (this.osType) {
      case OS.DARWIN:
      case OS.LINUX:
        this.copyFileCommand = this.copyFolderCommand = `cp -R`
        this.rmFileCommand = this.rmFolderCommand = `rm -rf`
        this.zipCommand = `zip -q -r`
        this.mkdirCommand = `mkdir -p`
        break
      case OS.WIN:
        this.copyFileCommand = `copy`
        this.copyFolderCommand = `Xcopy`
        this.rmFileCommand = `del`
        this.rmFolderCommand = `rmdir`
        this.mkdirCommand = `mkdir`
        // ZIP is not included well in every WINDOWS version :C
        break
    }
  }

  /**
   * @returns {string} stdout
   * @param command
   */
  private asyncExec(command: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      exec(command, (error, stdout, stderr) => {
        if (stdout) console.log(stdout)
        if (stderr) console.error(stderr)
        if (error) reject(error)
        resolve(stdout)
      })
    })
  }

  /**
   * @returns {string} stdout
   * @param from
   * @param to
   */
  public async copy(from: string, to: string): Promise<string> {
    const stats = await lstat(from)
    const command = stats.isDirectory()
      ? `${this.copyFolderCommand} "${from}" "${to}"`
      : `${this.copyFileCommand} "${from}" "${to}"`
    return await this.asyncExec(command)
  }

  /**
   * @returns {string} stdout
   * @param path
   */
  public async rm(path: string): Promise<string> {
    const stats = await lstat(path)
    const command = stats.isDirectory() ? `${this.rmFolderCommand} "${path}"` : `${this.rmFileCommand} "${path}"`
    return await this.asyncExec(command)
  }

  /**
   * @returns {string} stdout
   * @param what
   * @param zipFile
   */
  public async zip(what: string, zipFile: string): Promise<string> {
    if (this.osType === OS.WIN) return 'unavailable'
    const command = `cd "${what}" && ${this.zipCommand} "${zipFile}" .`
    return await this.asyncExec(command)
  }

  /**
   * @returns {string} stdout
   * @param path
   */
  public async mkdir(path: string): Promise<string> {
    const command = `${this.mkdirCommand} "${path}"`
    return await this.asyncExec(command)
  }
}
