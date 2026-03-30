console.log("A");

setTimeout(() => console.log("B"), 0);

console.log("C");

setTimeout(() => console.log("D"), 100);

console.log("E");

function loadUser(userId, callback) {
    setTimeout(() => {
        const user = {
            id: userId,
            name: "User " + userId,
            age: 25
        };
        callback(user);
    }, 1500);
}

// Usage
loadUser(1, (user) => {
    console.log("Loaded user:", user);
});

function getUserPosts(userId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { id: 1, title: "Post 1" },
                { id: 2, title: "Post 2" }
            ]);
        }, 1000);
    });
}

function getPostComments(postId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { id: 1, text: "Nice!" },
                { id: 2, text: "Cool!" }
            ]);
        }, 1000);
    });
}

getUserData(1)
    .then(user => getUserPosts(user.id))
    .then(posts => getPostComments(posts[0].id))
    .then(comments => console.log(comments))
    .catch(err => console.error(err));

async function getAllData() {
    try {
        const user = await getUserData(1);
        const posts = await getUserPosts(user.id);
        const comments = await getPostComments(posts[0].id);

        console.log(comments);
    } catch (error) {
        console.error(error);
    }
}

async function fetchUsers() {
    try {
        const res = await fetch("https://jsonplaceholder.typicode.com/users");
        const data = await res.json();
        console.log(data);
    } catch (err) {
        console.error(err);
    }
}

