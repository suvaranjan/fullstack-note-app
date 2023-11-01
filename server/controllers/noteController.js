const Note = require("../models/Note");


const createNote = async (req, res) => {
    try {
        const email = req.user.email;
        const { title, content } = req.body;

        await Note.create({
            email,
            title,
            content
        })

        return res.status(201).json({ message: "Note Saved" });

    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: 'Internal server error' });
    }

}


const getNote = async (req, res) => {
    try {
        const email = req.user.email;
        const { searchQuery } = req.query;

        let query = {
            email,
        };

        if (searchQuery) {
            query = {
                ...query,
                title: { $regex: searchQuery, $options: "i" },
            };
        }

        const notes = await Note.find(query);

        return res.status(200).json({ notes });

    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: 'Internal server error' });
    }
}


const updateNote = async (req, res) => {
    try {

        const { id } = req.params;
        const { title, content } = req.body;

        await Note.findByIdAndUpdate({ _id: id }, { title, content }, { new: true });

        return res.status(201).json({ message: "Updated" });


    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: 'Internal server error' });
    }
}

const deleteNote = async (req, res) => {
    try {

        const { id } = req.params;

        await Note.findByIdAndDelete({ _id: id });

        return res.status(201).json({ message: "Deleted" });


    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: 'Internal server error' });
    }
}



module.exports = { createNote, getNote, updateNote, deleteNote }