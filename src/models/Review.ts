class Review {
    id: string;
    reviewerName: string;
    rating: number; // Assuming rating is a number, e.g., 1-5 stars
    content: string;
    createdAt: Date;
  
    constructor(id: string, reviewerName: string, rating: number, content: string, createdAt: Date) {
      this.id = id;
      this.reviewerName = reviewerName;
      this.rating = rating;
      this.content = content;
      this.createdAt = createdAt;
    }
  }
  
export default Review;