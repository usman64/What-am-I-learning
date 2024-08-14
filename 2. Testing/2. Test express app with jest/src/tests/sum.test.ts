import { describe, expect, it } from '@jest/globals'
import request from 'supertest'
import { app } from '../sum'


describe('POST /sum', () => {
    it('should sum of two numbers', async () => {
        const res = await request(app).post('/sum').send({
            a: 2,
            b: 3,
        })

        expect(res.statusCode).toBe(200)
        expect(res.body.answer).toBe(5)
    });

    it('should return 411 if no input', async () => {
        const res = await request(app).post('/sum').send({})
        expect(res.statusCode).toBe(411)
        expect(res.body.message).toBe("Incorrect inputs");
    })
})

describe('GET /sum', () => {
    it('should sum of two numbers', async () => {
        const res = await request(app).get('/sum').set({ a: "2", b: "3" }).send()
        expect(res.statusCode).toBe(200)
        expect(res.body.answer).toBe(5)
    });

    it('should return 411 if no input', async () => {
        const res = await request(app).get('/sum').send()
        expect(res.statusCode).toBe(411)
        expect(res.body.message).toBe("Incorrect inputs");
    })
})