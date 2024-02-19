const {Field, Sport} = require("../model/model");

const FieldController = {
    addField: async (req,res) => {
        try{
            const newField = new Field(req.body);
            const savedField = await newField.save();
            if(req.body.sports){
                const sports = req.body.sports;
                sports.forEach(async id => {
                    const sport = Sport.findById(id);
                    await sport.updateOne({$push: {fields: savedField._id}});
                });
            }
            res.status(200).json(savedField);
        }catch(err){
            res.status(500).json(err);
        }
    },

    getAllFields: async (req,res) => {
        try {
            const fields = await Field.find();
            res.status(200).json(fields); 
        }catch (err){
            res.status(500).json(err);
        }
    },

    getAnField: async (req, res) => {
        try {
            const field = await Field.findById(req.params.id).populate("sports");
            res.status(200).json(field);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    updateField: async (req, res) =>{
        try {
            const field = await Field.findById(req.params.id);
            await field.updateOne(req.body);
            res.status(200).json("Update successfully");
        } catch (err) {
            res.status(500).json(err);
        }
    },

    deleteField: async (req,res) => {
        try {
            await Sport.updateMany(
                { fields: req.params.id}, 
                {$pull: {fields: req.params.id}}
            );
            const count = await Field.findByIdAndDelete(req.params.id);
            res.status(200).json(`Số phần tử phần tử bị xóa là ${count != null ? count : 0}`);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    deleteAllField: async (req, res) => {
        try{
            await Sport.updateMany(
                {},
                {$set :{fields : []}}
            )
            await Field.deleteMany();
            res.status(200).json("Delete All Things! You are a Demon!!!");
        }catch(err){
            res.status(500).json(err);
        }
    }
};

module.exports = FieldController;