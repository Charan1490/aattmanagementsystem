import AAT1 from "../models/AAT1.js";
import AAT2 from "../models/AAT2.js";
import RemedialSession from "../models/RemedialSession.js";
import StudentAAT1 from "../models/StudentAAT1.js";
import StudentAAT2 from "../models/StudentAAT2.js";

// Get AAT1 for student
export const getAAT1 = async (req, res) => {
  const studentId = req.user.id;

  try {
    const aat1 = await AAT1.find({ deadline: { $gt: new Date() } });
    const studentAAT1 = await StudentAAT1.find({ studentId });

    const aat1WithStatus = aat1.map((aat) => {
      const submission = studentAAT1.find((sa) => sa.aat1Id.equals(aat._id));
      return {
        ...aat.toObject(),
        submitted: !!submission,
        grade: submission ? submission.grade : "",
      };
    });

    res.status(200).json(aat1WithStatus);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch AAT1" });
  }
};

// Upload certificate for AAT1
export const uploadCertificate = async (req, res) => {
  const { aat1Id, certificate } = req.body;
  const studentId = req.user.id;

  try {
    await StudentAAT1.create({ studentId, aat1Id, certificate });
    res.status(201).json({ message: "Certificate uploaded successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to upload certificate" });
  }
};

// Get AAT2 for student
export const getAAT2 = async (req, res) => {
  const studentId = req.user.id;

  try {
    const aat2 = await AAT2.find({ endTime: { $gt: new Date() } });
    const studentAAT2 = await StudentAAT2.find({ studentId });

    const aat2WithStatus = aat2.map((aat) => {
      const submission = studentAAT2.find((sa) => sa.aat2Id.equals(aat._id));
      return {
        ...aat.toObject(),
        submitted: !!submission,
        marksObtained: submission ? submission.marksObtained : 0,
      };
    });

    res.status(200).json(aat2WithStatus);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch AAT2" });
  }
};

// Submit AAT2 answers
export const submitAAT2 = async (req, res) => {
  const { aat2Id, answers } = req.body;
  const studentId = req.user.id;

  try {
    const aat2 = await AAT2.findById(aat2Id);
    let marksObtained = 0;

    answers.forEach((answer, index) => {
      const question = aat2.questions[index];
      if (question.type === "mcq" || question.type === "fillInTheBlanks") {
        if (answer === question.correctAnswer) {
          marksObtained += question.marks;
        }
      }
    });

    await StudentAAT2.create({ studentId, aat2Id, answers, marksObtained });
    res.status(201).json({ message: "AAT2 submitted successfully", marksObtained });
  } catch (error) {
    res.status(500).json({ message: "Failed to submit AAT2" });
  }
};

// Get remedial sessions for student
export const getRemedialSessions = async (req, res) => {
  const studentId = req.user.id;

  try {
    const sessions = await RemedialSession.find({ students: studentId });
    res.status(200).json(sessions);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch remedial sessions" });
  }
};

// Get student statistics
export const getStatistics = async (req, res) => {
  const studentId = req.user.id;

  try {
    const aat1Submissions = await StudentAAT1.find({ studentId });
    const aat2Submissions = await StudentAAT2.find({ studentId });
    const sessionsAttended = await RemedialSession.countDocuments({ students: studentId });

    const statistics = {
      aat1Submitted: aat1Submissions.length,
      aat2Submitted: aat2Submissions.length,
      sessionsAttended,
      aat1Grades: aat1Submissions.map((sa) => sa.grade),
      aat2Marks: aat2Submissions.map((sa) => sa.marksObtained),
    };

    res.status(200).json(statistics);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch statistics" });
  }
};