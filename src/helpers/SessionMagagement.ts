export class SessionManagement {
  public init() {
    if (!this.checkIsCreatedSession()) {
      const RandomId = Math.floor(Math.random() * (5000 - 1 + 1) + 1);
      const sessionInfo = { id: RandomId };
      localStorage.setItem(`CV-session`, JSON.stringify(sessionInfo));
    } else {
      console.log('Session is Already created');
    }
  }

  public checkIsCreatedSession(): Boolean {
    return !!localStorage.getItem('CV-session');
  }

  public getSession(): number {
    return JSON.parse(localStorage.getItem('CV-session') || '{}')?.id;
  }
}

export default new SessionManagement();
