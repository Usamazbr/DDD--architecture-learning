export const crudLogs = ({ path, method }, _, next) => {
    console.log(`\x1b[33m` + method + `:\x1b[0m`, `\x1b[30m` + path + `\x1b[0m`);
    next();
};