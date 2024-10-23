import {DebugLogger, debug} from "node:util";
import {DateTimeShort} from "./datetime-formatter.util";

const reset = "\x1b[0m";
const log = {
    info: (text:string) => console.log("\x1b[32m" + text + reset),
    error: (text: string) => console.log("\x1b[31m" + text + reset),
    warn: (text: string) => console.log("\x1b[33m" + text + reset),
};

export default class Logger {
    private debugLogger: DebugLogger
    private name: string
    constructor(name: string) {
        this.debugLogger = debug(name)
        this.name = name
    }


    private logFormat(message: string, level: 'info' | 'error' | 'warn' | 'debug') {
       let niceMessage = `[${level.toUpperCase()}]|[${this.name}]|[${DateTimeShort()}] - ${message}`
        switch (level) {
            case 'error':
                log.error(niceMessage)
                break
            case 'warn':
                log.warn(niceMessage)
                break
            case 'debug':
                this.debugLogger(message)
                break
            default:
                log.info(niceMessage)
        }
    }

    info(message: string) {
        this.logFormat(message, 'info')
    }

    warn(message: string) {
        this.logFormat(message, 'warn')
    }

    error(message: string) {
        this.logFormat(message, 'error')
    }

    debug(message: string) {
        this.logFormat(message, 'debug')
    }

    static httpLogger(...messages: string[]) {
        const message = messages.join(' ')
        console.log(`[INFO]|[HTTP]|[${DateTimeShort()}] - ${message}`)
    }
}