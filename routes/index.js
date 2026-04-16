const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

fs.readdirSync(__dirname).forEach((file) => {

    if (file === "index.js") return;

    console.log("Checking file:", file);

    if (file.endsWith(".js")) {

        try {

            const route = require(path.join(__dirname, file));

            // ✅ Mount directly (NO PREFIX)
            router.use("/", route);

            console.log(`✅ Loaded: ${file}`);

        } catch (error) {

            console.error(`❌ Error loading ${file}:`, error.message);

        }
    }
});

module.exports = router;
