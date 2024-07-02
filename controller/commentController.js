import Comment from '../model/comments.js'

export const PostComment = async(request ,response) => {
    try {
            const comment = request.body ;
            const newComment = new Comment(comment);
            if(newComment){
                newComment.save();
                return response.status(201).json({
                    msg: 'Comment added successfully'
                })
            }
    } catch (error) {
        return response.status(500).json({
            msg: 'Something went wrong on server'
        })
    }
}

export const GetComments = async(request,response) =>{
    try {
        const id = request.params.id;
        const comments = await Comment.find({postId: id});
        if(comments.length < 1){
            return response.status(200).json({
                msg: 'No comments to display'
            })
        }
        if(comments){
            return response.status(200).json(comments)
        }
    } catch (error) {
        return response.status(500).json({
            msg: 'Something went wrong on server'
        })
    }
}

export const DeleteComment = async(request,response) =>{
    try {
        const id = request.params.id;
        const comment = await Comment.findOneAndDelete({_id: id});
        if(comment){
            return response.status(200).json('Deleted Successfully')
        }
    } catch (error) {
        return response.status(500).json({
            msg: 'Something went wrong on server'
        })
    }
}