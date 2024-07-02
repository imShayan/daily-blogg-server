import Post from '../model/post.js'

export const CreatePost = async (request, response) => {
    try{
        const post = await new Post(request.body);
        post.save();
       return response.status(200).json({msg:'post saved successfully'});
    }catch(error){
        return response.status(500).json(error)
    }
   
}

export const GetAllPosts = async( request, response ) => {
   
    let category = request.query.category;
    let posts;

    try{
        if(category){
            posts = await Post.find({categories: category})
        }else{
            posts = await Post.find({});
        }
        
        return response.status(200).json(posts);
        
    }catch(error){
     return response.status(500).json(error);
    }  
}

export const GetPostById = async (request, response ) => {
    const id = request.params.id;
    try{
        const post = await Post.findById(id);
        return response.status(200).json(post);

    }catch(error){
        return response.status(500).json({error: error});
    }
}

export const UpdatePost = async (request, response) => {
    try {
        console.log(request.params.id , request.body);
        const post = await Post.findById(request.params.id);

        if(!post){
            return response.status(404).json({msg: 'Post Not Found'})
        }
        
        await Post.findByIdAndUpdate(request.params.id , {$set : request.body});
        return response.status(200).json({msg: 'Post updated successfully'})
    } catch ({error}) {
        return response.status(500).json({error: error})
    }
}

export const DeletPost = async(request, response) => {
    try {
        const post = await Post.findById(request.params.id);
        if(!post){
            return response.status(404).json({msg: 'Post Not Found'})
        } 

       const result = await Post.findOneAndDelete({_id: post._id});
       console.log(result)
        return response.status(200).json({msg: 'Post deleted successfully'})
    } catch ({error}) {
        return response.status(500).json(error)
    }
}