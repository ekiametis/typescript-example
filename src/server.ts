import { app } from "./app";

const PORT = process.env.PORT || 3333;

app.listen(() => {
    console.log(`Application is listening on port ${PORT}`)
});