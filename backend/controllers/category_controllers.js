const { response } = require('express');
const express = require('express');
const createError=require('http-errors');
const { default: slugify } = require('slugify');
const Category = require('../models/category_model')

module.exports={

  //CREATE CATEGORY ADMIN ONLY
    create:async(req,res)=>{
      const categoryObj = {
        name:req.body.name,
        slug:slugify(req.body.name)
      }

      if (req.file) {
        categoryObj.categoryPicture = "/public/" + req.file.filename;
      }
    
      if (req.body.parentId) {
        categoryObj.parentId = req.body.parentId;
      }

      const cat=new Category(categoryObj);
      cat.save((error,category)=>{
        if(error) {
            return res.status(400).json({error});
    }
        if(category) {
            return res.status(201).json({category});
        }

      })
    },
//GET ALL CATEGORIES
    getCategories: async(req,res)=>{
      await Category.find({})
      .exec((error,categories)=> {
        if(error) return res.status(400).json({error});
        if(categories){
         res.send(categories)
        //  res.status(200).json({categories});
        }
      })
    },

    //UPDATE CATEGORY ADMIN ONLY - NOT YET TESTED
    updateCategories : async (req, res) => {
      const { _id, name, } = req.body;
      const updatedCategories = [];
      if (name instanceof Array) {
        for (let i = 0; i < name.length; i++) {
          const category = {
            name: name[i],
          };
       
    
          const updatedCategory = await Category.findOneAndUpdate(
            { _id: _id[i] },
            category,
            { new: true }
          );
          updatedCategories.push(updatedCategory);
        }
        return res.status(201).json({ updateCategories: updatedCategories });
      } else {
        const category = {
          name,
          
        };
     
        const updatedCategory = await Category.findOneAndUpdate({ _id }, category, {
          new: true,
        });
        return res.status(201).json({ updatedCategory });
      }
    },
  

//DELETE CATEGORY USING ID ADMIN ONLY
    deleteCategories : async (req, res,next) => {
      try{
          await Category.findByIdAndDelete(req.params.id)
          res.status(204).json({
            success: true,
            message: "Category Deleted Successfully",
          });
      } catch(error){
        res.status(400).json({ message: "Something went wrong" });
      }
    
}
}
