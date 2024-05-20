import links from "../Models/links.js";

const LinksController={
getList:async(req,res)=>{
    try{
        const linksArr=await links.find();
        res.json(linksArr);
    }
    catch(e)
    {
        res.status(400).json({message:e.message});
    }
},
getById:async(req,res)=>{
    try{
         const link=await links.findById(req.params.id);
        res.json(link);
    }
    catch(e)
    {
        res.status(400).json({message:e.message});
    }
},
getClicksBySource:async(req,res)=>{
    const id=req.params.id;
    try{
        const link=await links.findById(id); 
    const clickInfo = link.targetValues.reduce((acc, source) => {
        const sourceName = source.name;
        const clicksFromSource = link.clicks.filter((click) => {
          const sourceForClick = link.targetValues.find((s) => s.value._id.equals( click._id));
          return sourceForClick && sourceForClick.name === sourceName;
        });
        acc[sourceName] = clicksFromSource;
        return acc;
      }, {});
        res.json(clickInfo);
    }
    catch(e)
    {
        res.status(400).json({message:e.message});
    }
},
add:async(req,res)=>{
    const link=req.body;
    try{
const newLink=await links.create(link);
res.json(newLink);
    }
    catch(e)
    {
        res.status(400).json({message:e.message});
    }
},
update:async(req,res)=>{
    const id=req.params.id;
    try{
const updateLink=await links.findByIdAndUpdate(id,req.body,{new:true});
res.json(updateLink);
    }
    catch(e)
    {
        res.status(400).json({message:e.message});
    }
},
delete:async(req,res)=>{
    const id=req.params.id;
    try{
         const deleteLink= await links.findByIdAndDelete(id);
         res.json(deleteLink);
    }
    catch(e)
    {
        res.status(400).json({message:e.message});
    }
},

};

export default LinksController;