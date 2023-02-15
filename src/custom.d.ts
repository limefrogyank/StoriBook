declare module '*.svg' {
	const content: any;
	export default content;
  }
  declare module '*.css' {
	const content: any;
	export default content;
  }

  interface ChapterCue{
	title?: string;  //title is optional because we can actually retrieve it from chapter video metadata
	start: number;
  }