// lib/meals.js (database utility file)
import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";
import fs from "node:fs";

const db = sql("meals.db");

export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  return db.prepare("SELECT * FROM meals").all();
}

export function getMeal(slug) {
  return db.prepare("select * from MEALS WHERE slug = ?").get(slug);
}

export async function saveMeal(meal) {
  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions);

  const extension = meal.image.name.split(".").pop();
  const fileName = `${meal.slug}.${extension}`;

  // Use a promise-based approach for file writing
  const bufferedImage = await meal.image.arrayBuffer();

  return new Promise((resolve, reject) => {
    const stream = fs.createWriteStream(`public/images/${fileName}`);

    stream.on("finish", () => {
      meal.image = `/images/${fileName}`;

      try {
        db.prepare(
          `
          INSERT INTO meals 
            (title, summary, instructions, creator, creator_email, image, slug)
          VALUES (
              @title, 
              @summary, 
              @instructions, 
              @creator, 
              @creator_email, 
              @image,
              @slug
          )
        `
        ).run(meal);
        resolve();
      } catch (error) {
        reject(new Error("Database operation failed: " + error.message));
      }
    });

    stream.on("error", (err) => {
      reject(new Error("Saving image failed: " + err.message));
    });

    stream.write(Buffer.from(bufferedImage));
    stream.end();
  });
}
