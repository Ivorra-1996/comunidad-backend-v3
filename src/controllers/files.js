const models = require("../../database/models");
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://fjjrxhcerjjthjglqptp.supabase.co'
//la key de supa para que no haga bardo tiene que ser la de service key o secret
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZqanJ4aGNlcmpqdGhqZ2xxcHRwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5MzUyNjQ2NywiZXhwIjoyMDA5MTAyNDY3fQ.aJ54McCK2fK2Oac-hmGkXWfXZHYy5AiQ4GC_-W5ze8Y'
const supabase = createClient(supabaseUrl, supabaseKey)

let projectId = "red-seeker-365622"; // Google Cloud - consultar esto
let keyFilename = "./red-seeker-365622-b037b7220de8.json"; // Google Cloud -> Credentials -> Service Accounts
const storage = new Storage({
  projectId,
  keyFilename,
});
const bucket = storage.bucket("comunidadstorage"); // Cloud -> Storage


async function renameFile(srcFileName, destFileName) {
  await supabase
    .storage
    .from('files')
    .move(srcFileName, destFileName)
  console.log(
    `${srcFileName} renamed to ${destFileName}`
  )
};

export const uploadCV = async (req, res) => {
  const id = req.headers.id
  const nombre_almacenamiento = String(id + "/" + req.file.originalname)

  const {data, error} =  await supabase.storage.from('publicBucket').upload( nombre_almacenamiento, req.file.buffer, {
    contentType: req.file.mimetype,
    cacheControl: '3600',
    upsert: true
    })
  const publicUrl = supabase.storage.from('publicBucket').getPublicUrl(nombre_almacenamiento)['data']['publicUrl']

  updateCv(id, publicUrl);
  if (error) {
    console.log(error)
    res.status(500).send(error);
  } else {
    console.log(data)
    res.status(200).send(
      {
        url: publicUrl,
        id: id,
        status: "success"
      }
    );
  }
};

export const uploadLogo = async (req, res) => {
  //los errores de supa no necesitan try, no fallan sino que devuelven el error
  const id = req.headers.id
  const nombre_almacenamiento = String(id + "/" + req.file.originalname)
  const {data, error} =  await supabase.storage.from('publicBucket').upload( nombre_almacenamiento, req.file.buffer, {
    contentType: req.file.mimetype,
    cacheControl: '3600',
    upsert: true
    })
  const publicUrl = supabase.storage.from('publicBucket').getPublicUrl(nombre_almacenamiento)['data']['publicUrl']

  updateLogo(id, publicUrl);
  if (error) {
    console.log(error)
    res.status(500).send(error);
  } else {
    console.log(data)
    res.status(200).send(
      {
        url: publicUrl,
        id: id,
        status: "success"
      }
    );
  }
};

export const uploadFoto = async (req, res) => {
  //los errores de supa no necesitan try, no fallan sino que devuelven el error
  const id = req.headers.id
  const nombre_almacenamiento = String(id + "/" + req.file.originalname)

  const {data, error} =  await supabase.storage.from('publicBucket').upload( nombre_almacenamiento, req.file.buffer, {
    contentType: req.file.mimetype,
    cacheControl: '3600',
    upsert: true
    })
  const publicUrl = supabase.storage.from('publicBucket').getPublicUrl(nombre_almacenamiento)['data']['publicUrl']

  updateFoto(id, publicUrl);
  if (error) {
    console.log(error)
    res.status(500).send(error);
  } else {
    console.log(data)
    res.status(200).send(
      {
        url: publicUrl,
        id: id,
        status: "success"
      }
    );
  }
};


async function fetchFileFromGoogleStorage(fileName) {
  const fileObject = bucket.file(fileName);
  const fileContents = await fileObject.download();
  return fileContents[0];
};

export const getFiles = async (req, res) => {
  let fileName = req.headers.file;
  let type = req.headers.type;
  console.log("este es el file", fileName);
  console.log("este es el type", type);
  const downloadedImageFile = await fetchFileFromGoogleStorage(fileName);
  res.status(200);
  res.type(type);
  res.send(downloadedImageFile);
};

//Con esto actualizamos la foto 
const updateFoto = (id, url) => {
  const foto = url

  models.postulantes.update(
    { foto: foto },
    {
      where: {
        id: id,
      },
    }
  );
};

//Con esto actualizamos el CV
const updateCv = (id, url) => {
  const cv = url

  models.postulantes.update(
    { cv: cv },
    {
      where: {
        id: id,
      },
    }
  );
};

//Con esto actualizamos el Logo
const updateLogo = (id, url) => {
  const logo = url;

  models.empresas.update(
    { logo: logo },
    {
      where: {
        id: id,
      },
    }
  );
};