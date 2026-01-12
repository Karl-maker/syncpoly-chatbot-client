# Users API

This document describes the endpoints for managing user data.

---

## `GET /api/v1/users/telegram/:telegram_id`

Get a user by their Telegram ID.

### Request

**Path Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `telegram_id` | string | Yes | The Telegram user ID |

### Response

**200 OK**

```json
{
  "success": true,
  "user": {
    "id": "uuid",
    "username": "johndoe",
    "firstName": "John",
    "lastName": "Doe",
    "tokensUsed": 1500,
    "lastSnapShotOfTokensUsed": "2024-01-01T00:00:00.000Z",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "timezone": "America/New_York",
    "country": "US",
    "language": "en",
    "consentVersion": "1.0",
    "accessPeriod": "2024-12-31T23:59:59.000Z"
  }
}
```

**400 Bad Request**

```json
{
  "success": false,
  "error": "Request Error",
  "message": "Telegram ID is required"
}
```

**404 Not Found**

```json
{
  "success": false,
  "error": "Request Error",
  "message": "User not found"
}
```

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Unique user identifier (UUID) |
| `username` | string (optional) | User's username |
| `firstName` | string (optional) | User's first name |
| `lastName` | string (optional) | User's last name |
| `tokensUsed` | number | Total tokens used by the user |
| `lastSnapShotOfTokensUsed` | Date | Last time tokens were snapshotted |
| `createdAt` | Date | User creation timestamp |
| `timezone` | string | User's timezone (IANA timezone identifier) |
| `country` | string (optional) | User's country code (ISO 3166-1 alpha-2) |
| `language` | string (optional) | User's preferred language code |
| `consentVersion` | string (optional) | Privacy policy version user has consented to |
| `accessPeriod` | Date (optional) | Date when user's access expires (null if no expiration) |

### Example

```bash
curl -X GET "http://localhost:4040/api/v1/users/telegram/123456789"
```

---

## `POST /api/v1/users/:id/timezone-country`

Update a user's timezone and/or country.

### Request

**Path Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | string | Yes | The UUID of the user |

**Body:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `timezone` | string | No* | Timezone (e.g., "America/New_York", "UTC") |
| `country` | string | No* | Country code (e.g., "US", "GB") |

\* At least one of `timezone` or `country` must be provided.

```json
{
  "timezone": "America/New_York",
  "country": "US"
}
```

### Response

**200 OK**

```json
{
  "success": true,
  "user": {
    "id": "uuid",
    "username": "johndoe",
    "firstName": "John",
    "lastName": "Doe",
    "tokensUsed": 1500,
    "lastSnapShotOfTokensUsed": "2024-01-01T00:00:00.000Z",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "timezone": "America/New_York",
    "country": "US",
    "language": "en",
    "consentVersion": "1.0",
    "accessPeriod": "2024-12-31T23:59:59.000Z"
  }
}
```

**400 Bad Request**

```json
{
  "success": false,
  "error": "Request Error",
  "message": "At least one of timezone or country must be provided"
}
```

**404 Not Found**

```json
{
  "success": false,
  "error": "Request Error",
  "message": "User not found"
}
```

### Validation

- `timezone` must be a non-empty string if provided
- `country` must be a non-empty string if provided
- At least one of `timezone` or `country` must be provided

### Notes

- When timezone or country is updated, corresponding user traits are automatically created or updated
- The `timezone` field should use IANA timezone identifiers (e.g., "America/New_York", "Europe/London", "UTC")
- The `country` field should use ISO 3166-1 alpha-2 country codes (e.g., "US", "GB", "CA")

### Example

```bash
curl -X POST "http://localhost:4040/api/v1/users/{id}/timezone-country" \
  -H "Content-Type: application/json" \
  -d '{
    "timezone": "America/New_York",
    "country": "US"
  }'
```

---

## `POST /api/v1/users/:id/access-period`

Update a user's access period (expiration date).

### Request

**Path Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | string | Yes | The UUID of the user |

**Body:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `accessPeriod` | string \| number \| Date \| null | Yes | Access expiration date. Can be ISO date string, timestamp, Date object, or null to clear |

```json
{
  "accessPeriod": "2024-12-31T23:59:59.000Z"
}
```

Or to clear the access period:

```json
{
  "accessPeriod": null
}
```

### Response

**200 OK**

```json
{
  "success": true,
  "user": {
    "id": "uuid",
    "username": "johndoe",
    "firstName": "John",
    "lastName": "Doe",
    "tokensUsed": 1500,
    "lastSnapShotOfTokensUsed": "2024-01-01T00:00:00.000Z",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "timezone": "America/New_York",
    "country": "US",
    "language": "en",
    "consentVersion": "1.0",
    "accessPeriod": "2024-12-31T23:59:59.000Z"
  }
}
```

**400 Bad Request**

```json
{
  "success": false,
  "error": "Request Error",
  "message": "accessPeriod must be a valid ISO date string"
}
```

**404 Not Found**

```json
{
  "success": false,
  "error": "Request Error",
  "message": "User not found"
}
```

**500 Internal Server Error**

```json
{
  "success": false,
  "error": "Internal Server Error",
  "message": "Failed to update user"
}
```

### Validation

- `accessPeriod` must be one of:
  - A valid ISO 8601 date string (e.g., `"2024-12-31T23:59:59.000Z"`)
  - A valid Unix timestamp (number in milliseconds)
  - A Date object (when sent as JSON, it will be serialized as ISO string)
  - `null` to clear/remove the access period

### Notes

- If `accessPeriod` is set and the current date exceeds it, the user will be blocked from accessing the service
- When access expires, users are redirected to `${CLIENT_URL}/access` page
- Setting `accessPeriod` to `null` removes the expiration and allows unlimited access
- The access period check is performed automatically on all user requests via middleware

### Examples

**Set access period to a specific date:**

```bash
curl -X POST "http://localhost:4040/api/v1/users/{id}/access-period" \
  -H "Content-Type: application/json" \
  -d '{
    "accessPeriod": "2024-12-31T23:59:59.000Z"
  }'
```

**Set access period using timestamp:**

```bash
curl -X POST "http://localhost:4040/api/v1/users/{id}/access-period" \
  -H "Content-Type: application/json" \
  -d '{
    "accessPeriod": 1735689599000
  }'
```

**Clear access period (remove expiration):**

```bash
curl -X POST "http://localhost:4040/api/v1/users/{id}/access-period" \
  -H "Content-Type: application/json" \
  -d '{
    "accessPeriod": null
  }'
```

---

## General Notes

- The `timezone` field should use IANA timezone identifiers (e.g., "America/New_York", "Europe/London", "UTC")
- The `country` field should use ISO 3166-1 alpha-2 country codes (e.g., "US", "GB", "CA")
- All date fields are returned in ISO 8601 format
- The `accessPeriod` field controls when a user's access expires. If set and expired, the user will be blocked from using the service

