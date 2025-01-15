// src/pages/api/tasks.ts
export default function handler(req, res) {
    const { method, query } = req;
  
    switch (method) {
      case 'GET':
        // Mock task data for development
        res.status(200).json([
          {
            id: '1',
            title: "Attend Nischal's Birthday Party",
            description: "Buy gifts on the way and pick up cake from the bakery.",
            priority: 'Moderate',
            status: 'Not Started',
            createdOn: new Date(),
            userId: query.userId
          }
        ]);
        break;
      case 'POST':
        // Simulate task creation
        res.status(201).json({
          ...req.body,
          id: Math.random().toString(36).substr(2, 9)
        });
        break;
      default:
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  }