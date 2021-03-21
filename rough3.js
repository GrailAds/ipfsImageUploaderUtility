
'use strict'

const IPFS = require('ipfs')
const all = require('it-all')
const uint8ArrayConcat = require('uint8arrays/concat')
const uint8ArrayFromString = require('uint8arrays/from-string')
var fs = require('fs').promises;
var glob = require("glob")

let node;



async function main (node ,file_path) {
    

    // const data = await fs.readFile('pub_images/block_rush.jpg')
    let  data = await fs.readFile(file_path)
    // console.log(data)

    let file = await node.add({
        path: '',
        content: data
    })

    // console.log('Added file:', file.path, file.cid.toString())


    let cat_data = await all(node.cat(file.cid));
    console.log(cat_data)



    return file.cid.toString();

}

// main()

let images_path_pattern = './pub_images/*.jpg'
async function glob_reader(){
    const node = await IPFS.create();

    glob(images_path_pattern, async (error, files) => {
        console.log(files)
        files.map(async (file, i) => {
            try{
                let file_name = await file.substring(0)
                // console.log(i + " -- " + file_name + " ")
                let ret_hash = await main(node , file_name)
                console.log(i + " -- " + file_name + " " + ret_hash)
            }
            catch(error){
                console.log(error)
            }
        })
        return ;
    } )
    return;
}

glob_reader()