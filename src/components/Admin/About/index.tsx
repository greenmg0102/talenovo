
import { useState } from "react"
import { Select } from 'antd';
import Policy from "./policy"
import Refound from "./refound"
import Terms from "./terms"

export default function AboutEdit() {

    const [selectingItem, setSelectingItem] = useState('Policy')

    const handleChange = (value: string) => {
        setSelectingItem(value)
    };

    return (
        <div>
            <div className="flex justify-end mb-4">
                <Select
                    defaultValue="Policy"
                    style={{ width: 120 }}
                    onChange={handleChange}
                    options={[
                        { value: 'Policy', label: 'Policy' },
                        { value: 'Terms', label: 'Terms' },
                        { value: 'Refound', label: 'Refound' },
                    ]}
                />
            </div>
            {selectingItem === 'Policy' ? <Policy /> : null}
            {selectingItem === 'Terms' ? <Terms /> : null}
            {selectingItem === 'Refound' ? <Refound /> : null}
        </div>
    )
}