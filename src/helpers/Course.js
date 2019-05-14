class Schedule {
  constructor(courses) {
    this.courses = courses;
  }

  get courses() {
    return this.courses;
  }

}

class Course {
  constructor(name, lectures) {
    this.name = name;
    this.lectures = lectures;
  }
}

// we do not need to distinguish between section and lecture.

class Lecture {
  constructor(lectures) {
    this.lectures = lectures;
  }
}
