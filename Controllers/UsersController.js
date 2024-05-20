import links from "../Models/links.js";
import users from "../Models/users.js";

const UsersController={
    getList:async(req,res)=>{
        try{
            const usersArr=await users.find();
            res.json(usersArr);
        }
        catch(e)
        {
            res.status(400).json({message:e.message});
        }
    },
    getById:async(req,res)=>{
        try{
             const user=await users.findById(req.params.id);   
             res.json(user);
        }
        catch(e)
        {
            res.status(400).json({message:e.message});
        }
    },
    add:async(req,res)=>{
        const user=req.body;
        try{
    const newUser=await users.create(user);
    res.json(newUser);
        }
        catch(e)
        {
            res.status(400).json({message:e.message});
        }
    },
    update:async(req,res)=>{
        const id=req.params.id;
        try{
    const updateUser=await users.findByIdAndUpdate(id,req.body,{new:true});
    res.json(updateUser);
        }
        catch(e)
        {
            res.status(400).json({message:e.message});
        }
    },
    delete:async(req,res)=>{
        const id=req.params.id;
        try{
            const deleteUser= await users.findByIdAndDelete(id);
  deleteUser.linkArr.forEach(async(element) => {
    await links.findByIdAndDelete(element._id);
  });
            res.json(deleteUser);
        }
        catch(e)
        {
            res.status(400).json({message:e.message});
        }
    },
};

export default UsersController;