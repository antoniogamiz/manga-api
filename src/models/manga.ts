import mongoose from "mongoose";
import { runInNewContext } from "vm";
import { Manga } from "../types";

interface MangaDocument extends mongoose.Document, Manga {}

interface MangaModelInterface extends mongoose.Model<MangaDocument> {
  build(attr: Manga): MangaDocument;
}

const mangaSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    dropDups: true,
  },
  alternativeTitles: {
    type: [String],
    required: true,
  },
  status: {
    type: [String],
    required: true,
  },
  genres: {
    type: [String],
    required: true,
  },
  chapters: {
    type: [{ title: String, chapterPages: [{ url: String }] }],
  },
  chaptersEntries: {
    type: [{ url: String }],
    required: true,
  },
});

mangaSchema.statics.build = (attr: Manga) => {
  return new MangaModel(attr);
};

const MangaModel = mongoose.model<MangaDocument, MangaModelInterface>(
  "Manga",
  mangaSchema
);

export { MangaModel };
