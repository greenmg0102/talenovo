'use client'
import { useState, useEffect } from "react";
import ReactQuill from 'react-quill';
import { Button } from 'antd';
import { aboutEdit, readAboutEdit } from '@/store/action/admin/about'
import 'react-quill/dist/quill.snow.css';

export default function Policy() {

    const [params, setParams] = useState<any>(JSON.parse(JSON.stringify({
        id: null,
        title: '',
        description: '',
        descriptionText: '',
        assignee: '',
        path: '',
        tag: '',
        priority: 'low',
    })));

    useEffect(() => {
        async function fetchData() {
            let result = await readAboutEdit()
            let buffer = result.result.filter((item: any) => item.type === "Policy")
            buffer.length > 0 && setParams({ ...params, description: buffer[0].description, descriptionText: buffer[0].descriptionText })
        }
        fetchData()
    }, [])

    const save = async () => {
        const data = { type: "Policy", ...params }
        let result = await aboutEdit(data)
        let buffer = result.result.filter((item: any) => item.type === "Policy")
        buffer.length > 0 && setParams({ ...params, description: buffer[0].description, descriptionText: buffer[0].descriptionText })
    }

    return (
        <div className="">
            <ReactQuill
                theme="snow"
                value={params.description}
                defaultValue={params.description}
                onChange={(content, delta, source, editor) => {
                    params.description = content;
                    params.descriptionText = editor.getText();
                    setParams({
                        ...params,
                    });
                }}
            // style={{ minHeight: '500px' }}
            />

            <div className="w-full flex justify-end mt-2">
                <Button type="primary" onClick={save} className="text-blue-500">Save / Modify</Button>
            </div>
        </div >
    )
}