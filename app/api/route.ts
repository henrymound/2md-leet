import type {NextApiRequest, NextApiResponse} from 'next'

type ResponseData = {
    message: string
}

export async function POST(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    return new Response('Hello, Next.js!', {
        status: 200,
    })
}
