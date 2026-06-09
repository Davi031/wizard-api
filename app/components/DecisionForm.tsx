type Props = {
    option1: string
    option2: string
    setOption1: (value: string) => void
    setOption2: (value: string) => void
    onSubmit: () => void
    disabled: boolean
}

export default function DecisionForm({
    option1,
    option2,
    setOption1,
    setOption2,
    onSubmit,
    disabled
}: Props) {
    return (
        <div className="m-4 flex flex-col items-center">

            <div className="flex gap-4">

                <div>
                    <label>Option 1</label>

                    <input
                        type="text"
                        value={option1}
                        onChange={(e) =>
                            setOption1(e.target.value)
                        }
                        className="border p-2 ml-2"
                    />
                </div>

                <div>
                    <label>Option 2</label>

                    <input
                        type="text"
                        value={option2}
                        onChange={(e) =>
                            setOption2(e.target.value)
                        }
                        className="border p-2 ml-2"
                    />
                </div>

            </div>

            <button
                onClick={onSubmit}
                disabled={disabled}
                className="
                    border
                    px-4
                    py-2
                    mt-4
                    w-full
                    rounded
                    cursor-pointer
                    
                    
                "
            >
                Decide
            </button>
        </div>
    )
}