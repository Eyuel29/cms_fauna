class Review {
    id: string;
    reviewerName: string;
    reviewerEmail: string;
    rating: number;
    content: string;
    createdAt: Date;
  
    constructor(id: string, reviewerName: string, reviewerEmail: string, rating: number, content: string, createdAt: Date) {
      this.id = id;
      this.reviewerName = reviewerName;
      this.reviewerEmail = reviewerEmail;
      this.rating = rating;
      this.content = content;
      this.createdAt = createdAt;
    }
  }
  
export default Review;