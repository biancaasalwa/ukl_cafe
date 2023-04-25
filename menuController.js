//load model untuk `user` table//
const menuModel = require (`../models/index`).menu;
//load operasi untuk sequelize//
const Op = require(`sequelize`).Op
const multer = require("multer"); //upload file
const path = require("path"); //mengambil ekstensi file
const fs = require("fs")//import library fs untuk menghapus file
const {request,response} = require ('express')
const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const { options } = require("../routes/user.route");


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

//config storage image
const storage = multer.diskStorage( options: { //inisialisasi konfigurasi penyimpanan file
    destination: (req, file, cb) => {
        cb(null, "./public/image");
    },
    filename: (req, file, cb) => {
        cb(null, "img-" +Date.now() + path.extname(path: file.originalname));
    },
});
let upload = multer(options: { storage: storage});

//buat function untuk read semua data//
exports.getAllMenu = async (request, response) => {
    //panggil findAll() untuk menampilkan semua data//
    let menu = await userModel.findAll()
    return response.json({
        succes: true,
        data: menu,
        message: `semua menu ditampilkan`
    })
}

//buat function untuk filter//
exports.findMenu = async (request, response) => {
    //define keyword untuk menemukan data//
    let keyword = request.body.keyword

    //call findAll() within where clause and operation to find data based on keyword//
    let menu = await menuModel.findAll ({
        where: {
            [Op.or]: [
                { nama_menu: { [Op.substring]: keyword } },
                { jenis: { [Op.susbtring]: keyword } },
                { deskripsi: { [Op.susbtring]: keyword } },
                { gambar: { [Op.susbtring]: keyword } },
                { harga: { [Op.susbtring]: keyword } },
                { stok: { [Op.susbtring]: keyword } }

            ]
        }
})
return response.json({
    succes: true,
    data: menu,
    message: ` semua menu diambil datanya`
})
}

exports.addMenu = (request, response) => {
    let newMenu = {
        nama_menu: request.body.nama_menu,
        jenis: request.body.jenis,
        deskripsi: request.body.deskripsi,
        gambar: request.body.gambar,
        harga: request.body.harga,
        stok: request.body.stok
        
    }
    menuModel.create(newMenu)
    .then(result => {
        return response.json({
            succes: true,
            data: result,
            message: `menu ditambahkan`
        })
    })
    .catch(error => {
        return response.json({
            succes: false,
            message: error.message
        })
    })
}

exports.updateMenu = (request, response) => {
    let dataMenu = {
        nama_menu: request.body.nama_menu,
        jenis: request.body.jenis,
        deskripsi: request.body.deskripsi,
        gambar: request.body.gambar,
        harga: request.body.harga,
        stok: request.body.stok
    }
    let id_menu = request.params.id

    menuModel.update(dataMenu, { where: {id: id_menu}})
    .then(result => {
        return response.json({
            succes: true,
            message: ` data menu diupdate`
        })
    })
    .catch(error => {
        return response.json({
            succes: false,
            message: error.message
        })
    })
}

exports.deleteMenu = (request, response) => {
    let id_menu = request.params.id
    memberMenu.destroy({ where: { id: id_menu } })
        .then(result => {
            return response.json({
                succes: true,
                message: `data menu dihapus`
            })
        })
        .catch(error => {
            return response.json({
                succes: false,
                message: error.message
            })
        })

}