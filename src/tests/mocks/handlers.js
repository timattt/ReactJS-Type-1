import { http, HttpResponse  } from 'msw'

export const handlers = [
    http.get('/api/data', () => {
        // Simulate a successful response with mock data
        return HttpResponse.json({token: "ggg"})
    }),
];