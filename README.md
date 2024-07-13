# Convex Chat App

In this project, we are developing a chat application where users can message each other. Users can send text messages as well as files.

## Key Features

- Real-time messaging between users
- Ability to send files in addition to text messages
- Different styles to distinguish messages sent by users

## Technologies Used

- **React Native**: A JavaScript framework used for developing mobile applications.
- **TypeScript**: A superset of JavaScript that adds static type checking.
- **Convex**: https://www.convex.dev/ 

## Code Example

The following code snippet shows how a message is rendered:

```typescript
const renderMessage: ListRenderItem<Doc<"messages">> = ({ item }) => {
    const isUserMessage = item.user === user;

    return (
      <View
        style={[
          styles.messageContainer,
          isUserMessage
            ? styles.userMessageContainer
            : styles.otherMessageContainer,
        ]}
      >
        {item.content !== "" && (
          <Text
            style={[
              styles.messageText,
              isUserMessage ? styles.userMessageText : null,
            ]}
          >
            {item.content}
          </Text>
        )}
        {item.file && (
          <Image
            source={{ uri: item.file }}
```

## Installation

Follow these steps to set up the project:

1. Clone the project to your local machine.
2. Run `npm install` to install the necessary dependencies.
3. Run `npm start` to start the application.

## Screenshots

<img width="365" alt="Ekran Resmi 2024-07-13 08 38 36" src="https://github.com/user-attachments/assets/b23e43c6-2510-4ee6-8223-ff4219db576d">
<img width="346" alt="Ekran Resmi 2024-07-13 08 38 07" src="https://github.com/user-attachments/assets/e3e37b81-99c9-42c8-82ac-fcf390888b5e">
<img width="337" alt="Ekran Resmi 2024-07-13 08 36 44" src="https://github.com/user-attachments/assets/1cd8354d-1d33-4607-9f17-0edd066d13c1">
