import Client from './api'

export const GetDataByUsername = async (username) => {
    try {
        const res = await Client.get(`/user/${username}`)
        return res.data.user[0]
    } catch (err) {
        console.log(err)
    }
}

export const GetStacks = async (username) => {
    try {
        const res = await Client.get(`/user/${username}/stack`)
        return res.data.stacks
    } catch (err) {
        console.log(err)
    }
}

export const PostStack = async (username, data) => {
    try {
        const res = await Client.post(`/user/${username}/stack`, data)
        return res.data.newStack
    } catch (err) {
        console.log(err)
    }
}

export const DeleteStack = async (username, id) => {
    try {
        await Client.delete(`/user/${username}/stack/${id}`)
    } catch (err) {
        console.log(err)
    }
}

