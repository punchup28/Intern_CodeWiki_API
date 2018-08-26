const mongoose = require('mongoose')
const Editor = mongoose.model('Editor')
const Boom = require('boom')

exports.saveEditorData = (req, rep) => {

    console.log("Hello");

    const { editorRaw, title, tags, ownerId, ownerName } = req.payload
    const alive = 'true'
    if (!editorRaw || !title ) {
        return rep(Boom.notFound('Connot find raw data of editor.'))
    }
    
    const editor = new Editor({
        editorRaw,
        title,
        tags,
        owner: {
            ownerId,
            ownerName
        },
        alive,
    

    })

    editor.save(function(err) {
        if (err) { return rep(Boom.notFound(err)) }
        return rep({editor})
    })
}

exports.getEditorDataById = (req, rep) => {
    
    const { _id } = req.payload
   
    if(!_id) { return rep(Boom.notFound('Connot find id.'))}

    Editor.findOne({ _id }, (err, editor) => {
        if(err) { return rep(Boom.notFound(err)) }
        return rep({editor})
    }) 
    console.log('9')
    console.log(_id)
}

exports.getAllEditorTopic = (req, rep) => {
    console.log('4')
    Editor.find({alive: 'true'}, {title: true, owner: true, updatedAt: true, createdAt: true, tags: true }, (err, editor) => {
        if(err) { return rep(Boom.notFound(err)) }
        return rep({editor})
    })
}

exports.updateEditorDataById = (req, rep) => {
    const { _id, editorRaw, title, tags } = req.payload

    if(!_id) { return rep(Boom.notFound('Connot find id.'))}

    Editor.findOneAndUpdate({_id}, {editorRaw, title, tags, updatedAt: new Date() }, {new: true}, (err, editor) => {
        if(err) { return rep(Boom.notFound(err)) }
        return rep({editor})
    })
}

exports.addCommentById = (req, rep) => {
    const { _id, text, commentOwner } = req.payload

    const updateData = {
        text,
        commentOwner
    }

    Editor.findByIdAndUpdate(_id, {$push: {comment: updateData}}, {new: true}, (err, editor) => {
        if(err) { return rep(Boom.notFound(err)) }
        return rep({editor})
    })
}

exports.searchTopicByTagAndTitle = (req, rep) => {
    const { searchText } = req.payload
    console.log('2')
    Editor.find({
        $or: [
            { title: { "$regex": searchText, "$options": "i" } },
            { tags: { $in: [searchText] } }
        ]
    }, (err, topic) => {
        if(err) { return rep(Boom.notFound(err)) }
        return rep({topic})
    })
}

exports.searchMyTopic = (req, rep) => {
    console.log('1')
    //console.log(req)
    const { id } = req.payload
    console.log(id)
    Editor.find({ 'owner.ownerId': id , alive: 'true'}, {title: true, owner: true, updatedAt: true, createdAt: true, tags: true}, (err, topics) => {
        if(err) { return rep(Boom.notFound(err)) }
        return rep({topics})
    })
}

exports.deleteMyTopic = (req, rep) => {
    
    console.log('5')
    //console.log(req)

    const { id } = req.payload 
    console.log(id)


    //for dalete on real server 
    Editor.findByIdAndUpdate(id, {$set: {alive: 'false'}}, {new: true},(err, editor) => {
        if(err) { return rep(Boom.notFound(err)) }
        return rep({editor})
    })
    
    

    //for real delete on database

    // Editor.findByIdAndRemove(id , (err,topics) => {
    //     if(err) {
    //         return rep(Boom.notFound(err))
    //         }
    //     return rep({topics})

    // })
    

}

exports.saveComment = (req,rep) => {
    console.log('12')

    const {text, commentOwner, _id} = req.payload

    const updateData = {
        text,
        commentOwner
    }
        
    console.log('text :' + text + ' commentOwner :' + commentOwner + ' id : ' + _id)

    Editor.findByIdAndUpdate(_id, {$push: {comment: updateData}}, {new: true},(err, editor) => {
        if(err) { return rep(Boom.notFound(err)) }
        return rep({editor})
    })

    

} 



