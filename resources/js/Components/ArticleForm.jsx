import { usePage } from "@inertiajs/react";
import Editor from "./Editor";
import Error from "./Error";
import Filepond from "./Filepond";
import Input from "./Input";
import InputLabel from "./InputLabel";
import MultipleSelect from "./MultipleSelect";
import Select from "./Select";
import Textarea from "./Textarea";

export const ArticleForm = ({ data, setData }) => {
    const { errors, tags, categories, statuses } = usePage().props;

    const handleChange = (e) => setData(e.target.name, e.target.value);

    return (
        <>
            <div className="mb-6">
                <Filepond
                    onChange={(fileItems) =>
                        setData(
                            "picture",
                            fileItems.map((fileItem) => fileItem.file)
                        )
                    }
                    className="w-full lg:w-1/3"
                    files={data.picture}
                />
                {errors.picture && <Error value={errors.picture} />}
            </div>

            <div className="mb-6 grid grid-cols-12 gap-6">
                <div className="col-span-4">
                    <InputLabel forInput="category_id">Category</InputLabel>
                    <Select
                        value={data.category_id}
                        data={categories}
                        onChange={(e) => setData("category_id", e)}
                    />
                    {errors.category_id && <Error value={errors.category_id} />}
                </div>

                <div className="col-span-8">
                    <InputLabel forInput="tags">Tags</InputLabel>
                    <MultipleSelect
                        selectedItem={data.tags}
                        data={tags}
                        onChange={(e) => setData("tags", e)}
                    />
                    {errors.tags && <Error value={errors.tags} />}
                </div>
            </div>

            <div className="mb-6">
                <InputLabel forInput="title" value="Title" />
                <Input
                    name="title"
                    id="title"
                    onChange={handleChange}
                    value={data.title}
                />
                {errors.title && <Error value={errors.title} />}
            </div>

            <div className="mb-6">
                <InputLabel forInput="excerpt" value="Excerpt" />
                <Textarea
                    name="excerpt"
                    id="excerpt"
                    onChange={handleChange}
                    value={data.excerpt}
                />
                {errors.excerpt && <Error value={errors.excerpt} />}
            </div>

            <div className="mb-6">
                <Editor
                    name="body"
                    id="body"
                    onChange={handleChange}
                    value={data.body}
                />
                {errors.body && <Error value={errors.body} />}
            </div>

            <div className="mb-6">
                <InputLabel forInput="status">Status</InputLabel>
                <Select
                    value={data.status}
                    data={statuses}
                    onChange={(e) => setData("status", e)}
                />
                {errors.status && <Error value={errors.status} />}
            </div>
        </>
    );
};
