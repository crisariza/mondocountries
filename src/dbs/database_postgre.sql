CREATE DATABASE countriesdb;

SET client_encoding TO 'UTF8';

CREATE TABLE IF NOT EXISTS "countries"(
  "country_id" SERIAL PRIMARY KEY,
  "alpha3code" VARCHAR(3),
  "name" VARCHAR(255),
  "flag" VARCHAR(255),
  "capital" VARCHAR(255),
  "region" VARCHAR(255),
  "subregion" VARCHAR(255),
  "area" DECIMAL,
  "population" INTEGER
);

INSERT INTO countries (alpha3code, name, flag, capital, region, subregion, area, population) VALUES ('EST', 'Estonia', 'https://restcountries.eu/data/est.svg', 'Tallinn', 'Europe', 'Northern Europe', '45227.0', '1315944');

CREATE TABLE IF NOT EXISTS "activities"(
  "activity_id" SERIAL PRIMARY KEY,
  "title" VARCHAR(255),
  "difficulty" INTEGER,
  "duration" INTEGER,
  "season" VARCHAR(6),
  "country_alpha3code" VARCHAR(255)
);

INSERT INTO activities (title, difficulty, duration, season, country_alpha3code) VALUES ('Walking in the suburbs', '2', '30', 'Winter', 'AFG, ARG');