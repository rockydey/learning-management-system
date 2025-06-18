export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-[#e2e8f0] to-[#f1f5f9] text-black flex flex-col justify-center items-center p-8">
      <header className="text-center mb-12">
        <h1 className="text-5xl sm:text-6xl font-extrabold text-[#0a0a0a] tracking-wide leading-tight mb-4">
          Explore Our Blog
        </h1>
        <p className="text-xl sm:text-2xl text-[#454545] mt-4">
          Dive into the latest trends in education, technology, and more. Stay
          informed and inspired!
        </p>
      </header>

      <main className="max-w-7xl w-full space-y-12">
        {/* Blog Post Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Blog Post 1 */}
          <section className="bg-white text-black p-8 rounded-3xl shadow-lg transform transition-all hover:scale-105 hover:shadow-2xl hover:translate-y-2 duration-300 ease-in-out">
            <h2 className="text-3xl sm:text-4xl font-semibold text-[#0a0a0a] mb-4">
              Why Online Learning is the Future of Education
            </h2>
            <p className="text-lg sm:text-xl text-[#454545] mb-6">
              The world of education is rapidly changing, and online learning is
              at the forefront of this transformation. In this post, we explore
              the many benefits of online education and why it’s expected to
              play a pivotal role in the future of learning.
            </p>
            <button className="bg-[#2eca7f] text-black py-3 px-6 rounded-lg hover:bg-[#1a8c59] transition-all transform hover:scale-105 duration-300">
              Read More
            </button>
          </section>

          {/* Blog Post 2 */}
          <section className="bg-white text-black p-8 rounded-3xl shadow-lg transform transition-all hover:scale-105 hover:shadow-2xl hover:translate-y-2 duration-300 ease-in-out">
            <h2 className="text-3xl sm:text-4xl font-semibold text-[#0a0a0a] mb-4">
              How Technology is Shaping the Future of Learning
            </h2>
            <p className="text-lg sm:text-xl text-[#454545] mb-6">
              From artificial intelligence to virtual reality, technology is
              reshaping the landscape of education. This post delves into the
              innovations driving educational advancements and how learners and
              instructors can benefit from them.
            </p>
            <button className="bg-[#2eca7f] text-black py-3 px-6 rounded-lg hover:bg-[#1a8c59] transition-all transform hover:scale-105 duration-300">
              Read More
            </button>
          </section>

          {/* Blog Post 3 */}
          <section className="bg-white text-black p-8 rounded-3xl shadow-lg transform transition-all hover:scale-105 hover:shadow-2xl hover:translate-y-2 duration-300 ease-in-out">
            <h2 className="text-3xl sm:text-4xl font-semibold text-[#0a0a0a] mb-4">
              The Importance of Interactive Learning in Modern Education
            </h2>
            <p className="text-lg sm:text-xl text-[#454545] mb-6">
              As education evolves, interactive learning methods have gained
              popularity. In this post, we explore why interactive learning is
              essential for engaging students and enhancing their understanding
              of complex concepts.
            </p>
            <button className="bg-[#2eca7f] text-black py-3 px-6 rounded-lg hover:bg-[#1a8c59] transition-all transform hover:scale-105 duration-300">
              Read More
            </button>
          </section>

          {/* Blog Post 4 */}
          <section className="bg-white text-black p-8 rounded-3xl shadow-lg transform transition-all hover:scale-105 hover:shadow-2xl hover:translate-y-2 duration-300 ease-in-out">
            <h2 className="text-3xl sm:text-4xl font-semibold text-[#0a0a0a] mb-4">
              The Future of E-Learning Platforms: What to Expect
            </h2>
            <p className="text-lg sm:text-xl text-[#454545] mb-6">
              E-learning platforms are rapidly evolving to meet the needs of
              both students and educators. In this post, we’ll look at the
              trends that are shaping the future of these platforms and how
              they’re becoming more accessible and engaging.
            </p>
            <button className="bg-[#2eca7f] text-black py-3 px-6 rounded-lg hover:bg-[#1a8c59] transition-all transform hover:scale-105 duration-300">
              Read More
            </button>
          </section>

          {/* Blog Post 5 */}
          <section className="bg-white text-black p-8 rounded-3xl shadow-lg transform transition-all hover:scale-105 hover:shadow-2xl hover:translate-y-2 duration-300 ease-in-out">
            <h2 className="text-3xl sm:text-4xl font-semibold text-[#0a0a0a] mb-4">
              Why Collaboration is Key in Modern Learning Environments
            </h2>
            <p className="text-lg sm:text-xl text-[#454545] mb-6">
              Collaboration is essential for the success of students in todays
              learning environments. In this post, we discuss how collaborative
              learning helps students to think critically, solve problems
              together, and prepare for real-world challenges.
            </p>
            <button className="bg-[#2eca7f] text-black py-3 px-6 rounded-lg hover:bg-[#1a8c59] transition-all transform hover:scale-105 duration-300">
              Read More
            </button>
          </section>

          {/* Blog Post 6 */}
          <section className="bg-white text-black p-8 rounded-3xl shadow-lg transform transition-all hover:scale-105 hover:shadow-2xl hover:translate-y-2 duration-300 ease-in-out">
            <h2 className="text-3xl sm:text-4xl font-semibold text-[#0a0a0a] mb-4">
              How to Stay Motivated During Online Learning
            </h2>
            <p className="text-lg sm:text-xl text-[#454545] mb-6">
              Online learning can be challenging for many students. In this
              post, we explore strategies for staying motivated, managing
              distractions, and keeping a balanced routine while learning
              online.
            </p>
            <button className="bg-[#2eca7f] text-black py-3 px-6 rounded-lg hover:bg-[#1a8c59] transition-all transform hover:scale-105 duration-300">
              Read More
            </button>
          </section>
        </div>

        {/* See More Button */}
        <div className="flex justify-center mt-12">
          <button className="bg-[#2eca7f] text-black py-3 px-6 rounded-lg hover:bg-[#1a8c59] transition-all transform hover:scale-110 duration-300 shadow-lg">
            See More Posts
          </button>
        </div>
      </main>
    </div>
  );
}
