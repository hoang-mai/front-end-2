export {};

declare global {
  interface StudentProfile {
    id: number;
    email: string | null;
    fullName: string | null;
    dob: number | null;
    gender: Gender | null;
    phoneNumber: string | null;
    avatarUrl: string | null;

    ethnicity: string | null;
    idCardNumber: string | null;
    idCardPlaceOfIssue: string | null;
    residence: string | null;
    address: string | null;
    religion: string | null;

    motherName: string | null;
    motherYob: number | null;
    motherPhone: string | null;
    motherMail: string | null;
    motherOccupation: string | null;

    fatherName: string | null;
    fatherYob: number | null;
    fatherPhone: string | null;
    fatherMail: string | null;
    fatherOccupation: string | null;

  }
  interface BaseProfile{
    id : number;
    email: string | null;
    fullName: string | null;
    dob: number | null;
    gender: Gender | null;
    avatarUrl: string | null;
  }
  type Gender = "MALE" | "FEMALE" | "UNDEFINED";

  interface Announcement {
    id: number;
    title: string | null;
    content: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  }
  
}
