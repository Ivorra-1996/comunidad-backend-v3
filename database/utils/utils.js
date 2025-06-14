const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, '../../../comunidad-backend-v3/database/models/tipos_documentos.json');

const saveToDatabase = (DB) => {
    fs.writeFileSync(filePath, JSON.stringify(DB, null, 2), {
        encoding: "utf-8",
    });
};

// Esto habria que refactoriazar pasar la ruta por parametro a saveToDatabase y listo.
const filePath2 = path.resolve(__dirname, '../../../comunidad-backend-v3/database/models/estados.json');

const saveToDatabase2 = (DB) => {
    fs.writeFileSync(filePath2, JSON.stringify(DB, null, 2), {
        encoding: "utf-8",
    });
};

module.exports = { saveToDatabase, saveToDatabase2 };