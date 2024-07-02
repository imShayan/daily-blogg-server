const url = 'http://localhost:3001'

export const uploadImage = (request , response ) => {
  console.log(request.body)
  if(!request.file){
    return response.status(404).json({msg: 'soneghh'})
  }
  const imageUrl = `${url}/file/${request.file.filename}`;
  return response.status(200).json(imageUrl);
}