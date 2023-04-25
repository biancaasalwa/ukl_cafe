//load model untuk `user` table//
const userModel = require (`../models/index`).user;
//load operasi untuk sequelize//
const Op = require(`sequelize`).Op
const {request,response} = require ('express')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const md5 = require('md5')


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

//buat function untuk read semua data//
exports.getAllUser = async (request, response) => {
    //panggil findAll() untuk menampilkan semua data//
    let user = await userModel.findAll()
    return response.json({
        succes: true,
        data: user,
        message: `semua user diambil datanya`
    })
}

//buat function untuk filter//
exports.findUser = async (request, response) => {
    //define keyword untuk menemukan data//
    let keyword = request.body.keyword

    //call findAll() within where clause and operation to find data based on keyword//
    let user = await userModel.findAll ({
        where: {
            [Op.or]: [
                { nama_user: { [Op.substring]: keyword } },
                { role: { [Op.susbtring]: keyword } },
                { username: { [Op.susbtring]: keyword } },
                { password: { [Op.susbtring]: keyword } }

            ]
        }
})
return response.json({
    succes: true,
    data: user,
    message: ` semua user diambil datanya`
})
}

exports.addUser = (request, response) => {
    let newUser = {
        nama_user: request.body.nama_user,
        role: request.body.role,
        username: request.body.username,
        password: md5(request.body.password)
    }
    userModel.create(newUser)
    .then(result => {
        return response.json({
            succes: true,
            data: result,
            message: `new user has been inserted`
        })
    })
    .catch(error => {
        return response.json({
            succes: false,
            message: error.message
        })
    })
}

exports.updateUser = (request, response) => {
    let dataUser = {
        nama_user: request.body.nama_user,
        role: request.body.role,
        username: request.body.username,
        password: md5(request.body.password)
    }
    let id_user = request.params.id

    userModel.update(dataUser, { where: {id: id_user}})
    .then(result => {
        return response.json({
            succes: true,
            message: ` data user hass been updated`
        })
    })
    .catch(error => {
        return response.json({
            succes: false,
            message: error.message
        })
    })
}

exports.deleteUser = (request, response) => {
    let id_user = request.params.id
    memberUser.destroy({ where: { id: id_user } })
        .then(result => {
            return response.json({
                succes: true,
                message: `data user has been updated`
            })
        })
        .catch(error => {
            return response.json({
                succes: false,
                message: error.message
            })
        })

}