import express from "express";
import GoogleAccount from "../models/googleAccount";

const routerGoogleAccounts = express.Router();

// Create
routerGoogleAccounts.post("/", async (req, res) => {
  try {
    const newCourse = await GoogleAccount.create(req.body);
    return res.status(201).json(newCourse);
  } catch (error) {
    return res.status(500).json({ error: "Could not create course" });
  }
});

routerGoogleAccounts.get("/", async (req, res) => {
  try {
    // Kiểm tra xem tham số email có được cung cấp trong URL không
    const userEmail = req.query.email;
    if (userEmail) {
      // Nếu email được cung cấp, lọc theo email
      const courses = await GoogleAccount.find({ email: userEmail });
      return res.status(200).json(courses);
    } else {
      // Nếu không có email nào được cung cấp, lấy tất cả các khóa học
      const courses = await GoogleAccount.find();
      return res.status(200).json(courses);
    }
  } catch (error) {
    return res.status(500).json({ error: "Không thể lấy danh sách khóa học" });
  }
});

// Read all
routerGoogleAccounts.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await GoogleAccount.findOne({ userId: userId });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: 'Không thể lấy danh sách người dùng' });
  }
});

// Read all
routerGoogleAccounts.get('/', async (req, res) => {
  try {
    const users = await GoogleAccount.find();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ error: 'Không thể lấy danh sách người dùng' });
  }
});

// Read by ID
routerGoogleAccounts.get("/:id", async (req, res) => {
  try {
    const course = await GoogleAccount.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }
    return res.status(200).json(course);
  } catch (error) {
    return res.status(500).json({ error: "Could not retrieve course" });
  }
});

// Update
routerGoogleAccounts.put("/:id", async (req, res) => {
  try {
    const updatedCourse = await GoogleAccount.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedCourse) {
      return res.status(404).json({ error: "Course not found" });
    }
    return res.status(200).json(updatedCourse);
  } catch (error) {
    return res.status(500).json({ error: "Could not update course" });
  }
});
routerGoogleAccounts.put("/:userID", async (req, res) => {
  try {
    const { userID } = req.params;
    const updatedUserData = req.body;

    // Check if the user with the provided userID exists
    const existingUser = await GoogleAccount.findById(userID);

    if (!existingUser) {
      return res.status(404).json({ error: "User not found" });
    }

    // Perform the update
    const updatedUser = await GoogleAccount.findByIdAndUpdate(
      userID,
      updatedUserData,
      { new: true }
    );

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Could not update user data" });
  }
});
// Delete
routerGoogleAccounts.delete("/:id", async (req, res) => {
  try {
    const deletedCourse = await GoogleAccount.findByIdAndDelete(req.params.id);
    if (!deletedCourse) {
      return res.status(404).json({ error: "Course not found" });
    }
    return res.status(204).json();
  } catch (error) {
    return res.status(500).json({ error: "Could not delete course" });
  }
});

routerGoogleAccounts.put("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const updatedUserData = req.body;

    // Check if the user with the provided userId exists
    const existingUser = await GoogleAccount.findOne({ userId: userId });

    if (!existingUser) {
      return res.status(404).json({ error: "User not found" });
    }

    const updatedUser = await GoogleAccount.findOneAndUpdate(
      { userId: userId },
      updatedUserData,
      { new: true }
    );

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Could not update user data" });
  }
});

export default routerGoogleAccounts;
