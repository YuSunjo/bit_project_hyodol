const request = require('supertest');
const express = require('express');

const app = require('../../app');

test('should malddomiPage', async () => {
    const response = await request(app).get('/malddomi').send();
    expect(response.statusCode).toBe(200);
})


