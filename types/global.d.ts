/** Global definitions for developement **/

// for style loader
declare module '*.css' {
    const styles: any;
    export = styles;
}


interface ILogLevel extends Object {
    value: number;
    name: string;
}

interface IContext extends Object {
    level: ILogLevel;
    name?: string;
}

interface ILoggerOpts extends Object {
    logLevel?: ILogLevel;
    formatter?: (messages: any[], context: IContext) => void;
}

interface ILogger {
    DEBUG: ILogLevel;
    INFO: ILogLevel;
    TIME: ILogLevel;
    WARN: ILogLevel;
    ERROR: ILogLevel;
    OFF: ILogLevel;

    debug(...x: any[]): void;
    info(...x: any[]): void;
    log(...x: any[]): void;
    warn(...x: any[]): void;
    error(...x: any[]): void;
    useDefaults(options?: ILoggerOpts): void;
    setLevel(level: ILogLevel): void;
    getLevel(): ILogLevel;
    setHandler(logHandler: (messages: any[], context: IContext) => void): void;
    get(name: string): ILogger;
    time(label: string): void;
    timeEnd(label: string): void;
    enabledFor(level: ILogLevel): boolean;
    createDefaultHandler(options?: ILoggerOpts): (messages: any[], context: IContext) => void;
}

declare var log: ILogger;