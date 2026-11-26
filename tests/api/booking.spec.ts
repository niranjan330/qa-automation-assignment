
import { test, expect } from '@playwright/test';

const API_URL = 'https://restful-booker.herokuapp.com';

test.describe('Restful Booker API', () => {

  test('should retrieve the booking IDs', async ({ request }) => {
    const response = await request.get(`${API_URL}/booking`);

    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    expect(Array.isArray(responseBody)).toBeTruthy();
    expect(responseBody.length).toBeGreaterThan(0);
  });

  test('should create, retrieve, update and delete a booking', async ({ request }) => {

    // 1. Create booking
    const bookingData = {
      firstname: 'John',
      lastname: 'Doe',
      totalprice: 250,
      depositpaid: true,
      bookingdates: {
        checkin: '2026-12-01',
        checkout: '2026-12-05'
      },
      additionalneeds: 'Breakfast'
    };

    const createResponse = await request.post(`${API_URL}/booking`, {
      data: bookingData
    });

    expect(createResponse.status()).toBe(200);

    const createdBooking = await createResponse.json();
    const bookingId = createdBooking.bookingid;

    expect(bookingId).toBeDefined();

    console.log('Created Booking ID:', bookingId);

    // 2. Retrieve booking
    const getResponse = await request.get(`${API_URL}/booking/${bookingId}`);

    expect(getResponse.status()).toBe(200);

    const retrievedBooking = await getResponse.json();

    expect(retrievedBooking.firstname).toBe('John');
    expect(retrievedBooking.lastname).toBe('Doe');

    // 3. Get authentication token
    const authResponse = await request.post(`${API_URL}/auth`, {
      data: {
        username: 'admin',
        password: 'password123'
      }
    });

    expect(authResponse.status()).toBe(200);

    const authBody = await authResponse.json();
    const token = authBody.token;

    expect(token).toBeDefined();

    // 4. Update booking using PUT
    const updatedBooking = {
      firstname: 'Jane',
      lastname: 'Smith',
      totalprice: 300,
      depositpaid: false,
      bookingdates: {
        checkin: '2026-12-10',
        checkout: '2026-12-15'
      },
      additionalneeds: 'Lunch'
    };

    const putResponse = await request.put(`${API_URL}/booking/${bookingId}`, {
      headers: {
        Cookie: `token=${token}`
      },
      data: updatedBooking
    });

    expect(putResponse.status()).toBe(200);

    const putBody = await putResponse.json();

    expect(putBody.firstname).toBe('Jane');
    expect(putBody.lastname).toBe('Smith');
    expect(putBody.totalprice).toBe(300);

    // 5. Partially update booking using PATCH
    const patchResponse = await request.patch(`${API_URL}/booking/${bookingId}`, {
      headers: {
        Cookie: `token=${token}`
      },
      data: {
        firstname: 'Alex'
      }
    });

    expect(patchResponse.status()).toBe(200);

    const patchBody = await patchResponse.json();

    expect(patchBody.firstname).toBe('Alex');
    expect(patchBody.lastname).toBe('Smith');

    // 6. Delete booking
    const deleteResponse = await request.delete(`${API_URL}/booking/${bookingId}`, {
      headers: {
        Cookie: `token=${token}`
      }
    });

    expect(deleteResponse.status()).toBe(201);

    // 7. Verify booking no longer exists
    const verifyDeleteResponse = await request.get(`${API_URL}/booking/${bookingId}`);

    expect(verifyDeleteResponse.status()).toBe(404);

    console.log('Booking successfully deleted:', bookingId);
  });

  // Negative test 1: Retrieve a booking with an invalid ID
  test('should return 404 for a booking that does not exist', async ({ request }) => {
    const response = await request.get(`${API_URL}/booking/99999999`);

    expect(response.status()).toBe(404);
  });

  // Negative test 2: Reject an invalid booking payload
  test('should handle a booking request with missing required fields', async ({ request }) => {
    const response = await request.post(`${API_URL}/booking`, {
      data: {
        lastname: 'Doe',
        totalprice: 250,
        depositpaid: true,
        bookingdates: {
          checkin: '2026-12-01',
          checkout: '2026-12-05'
        }
      }
    });

    // The public API has been observed returning 500
    // for a booking payload missing required fields.
    expect(response.status()).toBe(500);
  });

  // Negative test 3: Reject an update with an invalid token
  test('should reject booking updates with invalid authentication', async ({ request }) => {
    // Create a booking so we have a real booking ID
    const createResponse = await request.post(`${API_URL}/booking`, {
      data: {
        firstname: 'Test',
        lastname: 'User',
        totalprice: 100,
        depositpaid: true,
        bookingdates: {
          checkin: '2026-12-01',
          checkout: '2026-12-05'
        },
        additionalneeds: 'Testing'
      }
    });

    expect(createResponse.status()).toBe(200);

    const createdBooking = await createResponse.json();
    const bookingId = createdBooking.bookingid;

    try {
      const updateResponse = await request.put(
        `${API_URL}/booking/${bookingId}`,
        {
          headers: {
            Cookie: 'token=invalid-token'
          },
          data: {
            firstname: 'Updated',
            lastname: 'User',
            totalprice: 100,
            depositpaid: true,
            bookingdates: {
              checkin: '2026-12-01',
              checkout: '2026-12-05'
            },
            additionalneeds: 'Testing'
          }
        }
      );

      expect(updateResponse.status()).toBe(403);
    } finally {
      // Clean up using valid authentication
      const authResponse = await request.post(`${API_URL}/auth`, {
        data: {
          username: 'admin',
          password: 'password123'
        }
      });

      expect(authResponse.status()).toBe(200);

      const authBody = await authResponse.json();

      const deleteResponse = await request.delete(
        `${API_URL}/booking/${bookingId}`,
        {
          headers: {
            Cookie: `token=${authBody.token}`
          }
        }
      );

      expect(deleteResponse.status()).toBe(201);
    }
  });


});
