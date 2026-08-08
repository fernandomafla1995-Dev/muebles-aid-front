const crypto = require("crypto");

const reference = "jkhhq2dc6hxrbaa2tmjdwwmy";
const amountInCents = 249990000;
const currency = "COP";
const integritySecret = "EL_VALOR_QUE_TIENES_AHORA_EN_ENV_LOCAL";

const signature = crypto
    .createHash("sha256")
    .update(`${reference}${amountInCents}${currency}${integritySecret}`)
    .digest("hex");

console.log("Firma calculada:", signature);