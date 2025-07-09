export const projectsData = [
  {
    id: 'trading-competition',
    title: '2025 Midwestern Trading Competition',
    description: 'Participated in a team at the 2025 Midwestern Trading Competition to design an algorithmic trading bot and a dynamic portfolio manager. Placed 5th out of 41 teams.',
    details: `
    <h1>Project Overview</h1>
    <p>
        The Midwestern Trading Competition is an annual trading competition hosted by the University of Chicago.
        Teams from top universities across the country fly out to compete in quantitative finance style case competitions.
        This year the competition was split into two cases, building a market making bot and 
        I participated in a team with 3 other students from the University of Chicago. We had about two weeks to prep for the competition,
        with a week and a half for the first case and a week for the second case.
        My main role was to implement the code for our trading strategies and portfolio optimization techniques.
        We placed 5th out of 41 teams and 1st out of the 10 teams from the University of Chicago.
    </p>
    <h3>Case 1: Market Making</h3>
        <p>
            In the first case, we were tasked with building a market making bot.
            We were given a set of three stocks, an ETF, and inverse ETF to trade.
            During the competition rounds, periodic news update were given relating to the stocks.
            We used these news updates to determine a fair price for each of the stocks. We then
            compared the fair price to the current market prices to determine if a competitor bid existed
            and then created market edges to deteremine our ask and bid prices. For the ETF, we were given 
            the option for a small fee to swap the ETF for the one of each stock and vice versa.
            We leveraged this by looking for arbitrage opportunities between the ETF and the stocks, based 
            off of the fair prices we had calculated and additional calculations to account for inventory imbalance.
            We then would perform a market order to swap the ETF for the stocks or vice versa to take advantage of the arbitrage.
            I designed the logic for recieving news updates and updating the fair prices of the stocks accordingly.
            I also helped design our competitive edge calculations by taking the most competive bid and ask currently
            on the market, and comparing them to our own fair prices. Additionally, I also implemented a log of all of our most recent market orders in order to create a
            better estimate of the fair price of the stocks. This also helped us manage risk by cancelling orders
            that were no longer competitive. Overall, we opted for a more conservative approach to market making, rather 
            than trying any fancy techniques. We were able to maintain a consistent PnL from round to round, thanks to 
            robust risk management, averaging around $100,000,000 profit per round.
        </p>
    <h3>Case 2: Portfolio Management</h3>
        <p>
            In the second case, we were tasked with building a dynamic portfolio manager. We were
            given a dataset of ten years of historical intraday price data for six assets. We then were
            scored based off the Sharpe ratio of our portfolio over a six month period using the same six assets.
            Given the large amount of data, we were able to use a variety of techniques to optimize our portfolio.
            We started by using tools such as NumPy, Pandas, and SciPy to perform statistical analysis on the data.
            I ran analysis over the historical data to help determine the overall trends and the correlation between the assets.
            Our development process involved designing a multi-signal strategy tailored to capture diverse market behaviors.
            We implemented five normalized indicators, including Sharpe scores, momentum, contrarian signals, volatility asymmetry,
             and cross-sectional ranks, to comprehensively reflect short-term market dynamics. These signals were adaptively blended based on volatility regimes: during low volatility, 
             stability-oriented signals like Sharpe and momentum received greater emphasis, while high volatility conditions shifted focus towards trend-following momentum signals. 
             To optimize risk-adjusted returns, I incorporated nonlinear amplification, adjusting signal aggressiveness via adaptive exponents to match market volatility. 
             Risk was managed through volatility targeting, scaling weights to maintain a consistent portfolio volatility of 1.5%, with additional safeguards against over-leverage. 
             While the approach provided sound risk control and dynamic responsiveness, it faced limitations such as sensitivity to short-term noise, 
             potential misalignment from static weighting schemes, and constraints in testing breadth, leaving room for future refinement.<br><br>
             Visit the linked GitHub repo for a full breakdown of our strategy and implementation.
        </p>
    `,
    image: '/src/assets/uchicago 1.jpg',
    github: 'https://github.com/ayushpillai1028/uchicago-trading-competition',
    demo: '',
    tags: ['Python', 'Market Making', 'Portfolio Management', 'Algorithmic Trading', 'Data Analysis'],
  },
  {
    id: 'lzw-compressor',
    title: 'LZW File Compressor',
    description: 'Command line program built in C that uses LZW compression. Includes custom features.',
    details: `
      <h1>Project Overview</h1>
      <p>
        Built a command line file compressor in C that uses the <a href="https://citeseerx.ist.psu.edu/document?repid=rep1&type=pdf&doi=1a95178ba587cd4a7b1591e8143923d68323c743" style="color: #3ad1ff;"> LZW</a> algorithm to compress and decompress files.
        The basic encoding algorithm is as follows:
        </p>
        <ol>
            <li>Initialize a dictionary with the 256 ASCII characters</li>
            <li>Read the input file and look for the longest substring in the dictionary</li>
            <li>If the substring is found, add it to the dictionary and flush the code for the substring to the output file</li>
            <li>If the substring is not found, add it to the dictionary and output the code for the substring</li>
            <li>Repeat until the end of the file</li>
        </ol>
        <p>
             &emsp;I also implemented two advanced features, dictionary table pruning and variable output bits per dictionary entry. Both of these features can be enabled via command line arguments.<br>
            <b style="color: #3ad1ff;">Table Pruning:</b> In the original algorithm, when the table reaches max additional entries, no new entries are added from that point on.
            Pruning allows the table to be dynamically resized by removing non frequent substrings from the table when the table is full.
            Entries which are not used as prefixes for other entries are removed from the table, allowing for new entries to be added.<br>
            <b style="color: #3ad1ff;">Variable Output Bits:</b> By default, the algorithm uses 12 bits to represent the dictionary entries.
            As a consequence, the maximum dictionary size is 4096 entries (2^12). I implemented a feature that allows the amount of bits 
            used to represent the dictionary entries to be a user input. The program supports from 8 to 20 bits per entry. This allows 
            for finer control over the output. Additionally, to account for larger entry bit sizes potentially taking up more space,
            the program only will print out as many bits as is needed to print out the current maximum dictionary size. For example,
            if the user has set the the maximum bits per entry to 12, but the dictionary currently has 4096 entries, the program will only
            print out 9 bits per entry. However, once the dictionary exceeds 4096 entries, it will then start printing out 10 bits per entry,
            and will continue this trend until 12 bits per entry is required to print dicitionary entries.
        </p>
       <h3>Efficiency:</h3>
       <p>
        &emsp;The compression ratio falls between 20% to 50% of the original file size. Compression ratio
        can optimized by using the custom features as they best fit the file being compressed. This compressor works
        best on raw text files with repeated patterns. It does not perform well on formats such as jpeg or mp4, since
        those files are already compressed in format.
       <h3>Technical Implementation:</h3>
       <p>
        &emsp;The first critical decision in my implementation was selecting suitable data structures for the LZW algorithm. For encoding, I chose a chained hash table, designing appropriate entry structures and functions for efficient insertion, searching, and maintenance. In contrast, decoding utilized an array-based table to allow direct indexing by code, paired with a stack to reconstruct and output strings by traversing stored prefixes.<br>
        &emsp;Initially, I used unsigned integers to represent dictionary entries, assuming only positive numbers were needed. However, this approach caused difficulties representing empty entries, which are essential for constructing new dictionary entries. Since zero was already a valid ASCII character, no suitable unsigned value was available. Ultimately, I switched to signed integers, using -1 to clearly represent an empty entry, significantly simplifying the algorithm compared to previous workarounds.<br>
        &emsp;Table pruning posed my most substantial implementation challenge. To ensure consistency, pruned tables needed to retain relative ordering from the original dictionaries. In encoding, I resolved this by using a buffer array to track entries needing new codes, assigning new values accordingly upon pruning. For decoding, I marked entries used as prefixes and then transferred those to a new table after pruning, again maintaining their original ordering.<br> 
        &emsp;Additionally, I implemented careful bit-level management of printed entry lengths with custom structures and functions for encoding and decoding, incrementing bit lengths dynamically based on dictionary size and adjusting decode conditions appropriately to account for encoding's one-step lead.<br>
       </p>
       <h3>Debugging Features:</h3>
       <p>
       &emsp; Lots of issues arose from decode not generating the same dictionary table as encode while it was running.
       To find the points where the tables differed, I implemented a feature which prints out the dictionary table for both parts
       of the program after they were finished. If the table was pruned during the process, I would print out the original andpruned tables.
       This was very helpful for debugging when developing the pruning feature, since if a table was pruned multiple times during runtime,
       it would often generate a few issues between the two programs. This print feature is enable via a environment variable.
       </p>
    `,
    image: '', 
    github: 'https://github.com/vdas27/lzw-compressor',
    demo: '',
    tags: ['Systems Programming', 'C', 'Bit Manipulation', 'Memory Management', 'I/O Management'],
  },
  {
    id: 'unix-project',
    title: 'Custom UNIX Shell',
    description: 'Designed a UNIX-style shell in C. Supports multiple processes, I/O redirection, and custom features.',
    details: `
     <h1>MyShell: A Custom-Built UNIX Shell</h1>

    <p>
        <strong>MyShell</strong> is a lightweight command-line shell written in C that replicates core Unix shell behavior
        while offering some unique enhancements, including a novel form of output redirection.
        Designed to handle both interactive and batch processing, MyShell demonstrates the integration of
        system calls, process control, and file management in Unix-like environments.
    </p>

    <h2>Key Features</h2>
    <ul>
        <li><strong style="color: #3ad1ff;">Built-in Commands:</strong> Supports <code>cd</code>, <code>pwd</code>, and <code>exit</code> with error handling.</li>
        <li><strong style="color: #3ad1ff;">Command Execution:</strong> Executes external programs via <code>execvp</code> in forked child processes.</li>
        <li><strong style="color: #3ad1ff;">Batch Mode:</strong> Accepts a file of commands as input, processing them line by line.</li>
       <li><strong style="color: #3ad1ff;">Output Redirection:</strong>
            <ul>
                <li><code>&gt; filename</code>: Creates or overwrites an output file. Fails if the file already exists (exclusive creation).</li>
                <li><code>&gt;+ filename</code>: <strong>Prepends</strong> the command's output to the file — a behavior not found in standard Unix shells. The existing contents are preserved by being shifted after the new output.</li>
            </ul>
        </li>
        <li><strong style="color: #3ad1ff;">Parsing Engine:</strong> Custom tokenizer handles whitespace, redirection operators, and malformed inputs robustly.</li>
        <li><strong style="color: #3ad1ff;">Error Handling:</strong> Gracefully handles input length violations, malformed syntax, and system call failures.</li>
    </ul>

    <h2>Development Highlights</h2>
    <ul>
        <li>Advanced use of <code>dup2</code>, <code>lseek</code>, and <code>ftruncate</code> for dynamic file output control.</li>
        <li>String parsing using <code>strtok_r</code> to manage multi-command lines and redirection tokens.</li>
        <li>Insight into low-level I/O and the behavior of shell pipelines.</li>
    </ul>

    <h2>Future Enhancements</h2>
    <ul>
        <li>Support for input redirection (<code>&lt;</code>) and pipelines (<code>|</code>).</li>
        <li>Improved memory cleanup and error reporting granularity.</li>
        <li>Background execution with <code>&amp;</code>.</li>
    </ul>
    `,
    video: '',
    image: '',
    github: '',
    tags: ['Systems Programming', 'C', 'Process Management', 'I/O Management'],
  },
  {
    id: 'premier-league-match-predictor',
    title: 'Premier League Win Predictor',
    description: 'ML project to predict outcomes of Premier League matches.',
    details: `
    <h1>Predicting Outcomes with Web-Scraped Data</h1>

    <p>
        This project combines web scraping and machine learning to predict outcomes based on live or recent data.
        It consists of two primary components: a data scraping pipeline and a predictive modeling notebook.
    </p>

    <h2>1. Data Collection via Web Scraping</h2>
    <p>
        Using Python's <code>requests</code> and <code>BeautifulSoup</code> libraries, the <strong>scraping.ipynb</strong> notebook retrieves
        structured data from a target website. This data likely includes updated standings, game results, or performance metrics.
    </p>
    <ul>
        <li>Automated HTTP requests to endpoints</li>
        <li>Timely data refresh using sleep cycles to prevent rate limiting</li>
        <li>Data stored in pandas DataFrames for analysis</li>
    </ul>

    <h2>2. Predictions Using Machine Learning</h2>
    <p>
        The <strong>predictions.ipynb</strong> notebook processes the scraped data and applies a classification model—
        specifically a <code>RandomForestClassifier</code> from scikit-learn—to predict categorical outcomes.
    </p>
    <ul>
        <li>Data cleaning and feature engineering</li>
        <li>Model training and evaluation</li>
    </ul>

    <h2>Technical Highlights</h2>
    <ul>
        <li><strong>Libraries:</strong> pandas, scikit-learn, BeautifulSoup, requests</li>
        <li><strong>Architecture:</strong> One notebook for scraping, another for ML modeling</li>
        <li><strong>Reusable:</strong> Scraped data can be updated and reused for fresh predictions</li>
    </ul>

    <h2>Next Steps</h2>
    <ul>
        <li>Add support for real-time prediction dashboards</li>
        <li>Use model explainability tools like SHAP or feature importance charts</li>
        <li>Expand to scrape and train on multi-season or multi-league data</li>
    </ul>
    `,
    video: '',
    image: '/src/assets/premier-league.png',
    github: 'https://github.com/vdas27/vdas27.github.io',
    tags: ['ML', 'scikit learn', 'pandas', 'Web Scraping', 'Data Analysis'],
  },
  {
    id: 'go-game',
    title: 'Python: GO Board Game',
    description: 'Terminal based implementation of the game Go. Completed in group.',
    details:`
    <p>
        This project is a team-built implementation of the classic board game <strong>Go</strong>, designed in Python. 
        It features both a terminal-based interface and computer-driven gameplay. Our goal was to create a flexible and modular game that 
        could be played by both humans and bots, all from the comfort of the command line or an optional graphical interface.
    </p>

    <h2>Project Overview</h2>
    <p>
        The game was developed collaboratively using Git for version control and team coordination. 
        Each team member contributed to distinct components of the system to ensure a clean division of labor and seamless integration.
    </p>

    <h2>My Contributions</h2>
    <ul>
        <li><strong>Text-Based User Interface (TUI):</strong> I built an interactive terminal interface using <code>click</code> and <code>colorama</code>, allowing users to play the game directly in the command line.</li>
        <li><strong>Game Logic:</strong> I implemented the core Go game engine, including the board representation, player tracking, and turn-handling logic in <code>go.py</code>.</li>
    </ul>

    <h2>Teammate Contributions</h2>
    <ul>
        <li><strong>Game Bots:</strong> Multiple game bots were created, including a smart strategy bot and a random move generator.</li>
        <li><strong>Graphical User Interface (GUI):</strong> A teammate developed a GUI version of the game using an external graphics toolkit for an alternate way to play.</li>
        <li><strong>Quality Assurance (QA):</strong> Another teammate was responsible for extensive testing and debugging to ensure the game logic held up under different scenarios and edge cases.</li>
    </ul>

    <h2>Technical Breakdown</h2>

    <h3>1. <code>go.py</code> — Core Game Logic</h3>
    <ul>
        <li>Represents the Go board as a 2D grid supporting any square size.</li>
        <li>Implements move logic and state management using a deep copy strategy for reliability.</li>
    </ul>

    <h3>2. <code>tui.py</code> — Terminal UI</h3>
    <ul>
        <li>Uses <code>click</code> for CLI handling and <code>colorama</code> for colorful board rendering.</li>
        <li>Handles user interaction and integrates bot play when applicable.</li>
    </ul>

    <h3>Unique Features</h3>
    <ul>
    <li><strong>Game Customization:</strong> Play against friends or bots with support for up to 9 players. Board can be customized to any size.</li>
        <li><strong>Hints:</strong> Players can request the game engine for hints to find their best possible next move.</li>
        <li><strong>Super-Ko Ruleset:</strong> <a href="https://senseis.xmp.net/?SuperKo" style="color: #3ad1ff;">Poistional Super-Ko</a> supported, which prevents the same board state from being repeated in a game.</li>
        <li><strong>Bot Support:</strong> Includes both strategic and random move-generating bots.</li>
        <li><strong>Colorful TUI:</strong> ANSI-based board coloring allows for easy visual parsing of game state.</li> 
    </ul>

    <h3>Team Workflow</h3>
    <ul>
        <li>All code was version-controlled via GitHub to ensure seamless collaboration.</li>
        <li>Frequent code reviews and merges ensured minimal integration conflicts.</li>
        <li>Tasks were divided by functionality: game logic, interface design, game bots, QA, and GUI development.</li>
        <li>Set milestones to meet for each component of the project to ensure timely completion.</li>
    </ul>

    <p>
        This project was both a technical challenge and a great learning experience in collaborative software development.
        It demonstrates how modular design, good communication, and version control can enable a small team to build a complex, feature-rich application.
    </p>
    `,
    video: '',
    image: '/src/assets/go.webp',
    tags: ['Python', 'Game Development', 'Object Oriented Programming', 'Git Collaboration', 'QA Testing'],
  },
  {
    id: 'portfolio',
    title: 'Portfolio Website',
    description: 'My personal portfolio built with React, Vite, and JavaScript.',
    details:`
    This site is a single-page React app designed using Vite, React Router, and CSS modules. Built to showcase my projects and skills.
    Used custom modules from <a href="https://reactbits.dev/" style="color: #3ad1ff;">reactbits.dev</a> to personalize the style of the website.
    It's an ongoing project, so let me know what you think!
    `,
    video: '',
    image: '/src/assets/react.svg',
    github: 'https://github.com/vdas27/vdas27.github.io',
    tags: ['React', 'JSX', 'CSS Modules', 'UI/UX', 'HTML'],
  },
]; 