import "tailwindcss/tailwind.css"

export const HypertextWrapper = (props: {
    htmlString: string
}) => {


    return (
        <>

            <div id="skip">
                <article
                    style={{color: 'white'}}
                    className="prose lg:prose-xl px-8 m-auto my-4 sm:my-16"
                    dangerouslySetInnerHTML={{__html: props.htmlString}}
                />
            </div>
        </>
    );
}